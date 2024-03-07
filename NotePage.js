
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { database } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { View, Text, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NotePage = ({ navigation, route }) => {

  const [noteDetails, setNoteDetails] = useState ('');
  const [imagePath, setImagePath] = useState(null);
  const details = route.params?.details;


  useEffect(() => {
     
    const getNoteDetails = async () =>{
      const noteRef = doc(database, "notes", details.id);
      try{
        const getDetails = await getDoc(noteRef);
        if(getDetails.exists()){
          setNoteDetails(getDetails.data().details || '');
        } else {
          console.log("No note found");
        }
      }catch(err){
        console.error("Error fetching note document", err);
      }
    };

    const downloadImage = async () => {
      getDownloadURL(ref(storage, details.id + ".jpg"))
        .then((url) => {
          setImagePath(url);
        })
        .catch((err) => {
          console.log("No image or error", err);
          setImagePath(null); 
        });
      };
    getNoteDetails();
    downloadImage();

  }, [details.id]);


  const saveNoteDetails = async () => {
    const noteRef = doc(database, "notes", details.id);
    try {
      await updateDoc(noteRef, {
        details: noteDetails
      });
      if(imagePath){
        await uploadImage();
      }
      console.log("NoteDetails saved");
    } catch(err) {
      console.error("Error updating Note", err);
    }
  }

  async function cameraLaunch(){
    const result = await ImagePicker.requestCameraPermissionsAsync()
    if(result.granted===false){
      console.log("Access to camera not allowed")
    }else {
      ImagePicker-ImagePicker.launchCameraAsync({
        quality:1
      })
      .then((response)=> {
        console.log("Image loaded" + response)
        setImagePath(response.assets[0].uri)
      })
    }
  }

  async function lounchImagePicker(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowEditing: true
    })
    if(!result.canceled){
      setImagePath(result.assets[0].uri)
    }
  }

  async function uploadImage(){
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const storageRef = ref(storage, details.id + ".jpg")
    uploadBytes(storageRef, blob). then((snapshot)=> {
      alert("Image uploaded")
    })
  }


  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.text}>Note: {details.text}</Text>
      </View>

      <View style={styles.noteDetailContainer}>
        <TextInput
          multiline
          textAlign='top'
          value={noteDetails}
          onChangeText={setNoteDetails}
          placeholder='Add notes here....'
          placeholderTextColor={'#b8d4b8'}
          style={styles.noteDetailInput}
        />
      </View>
      <View style={styles.imageDB}>
        <View >
          <Image style={{width: 150, height: 150}} source={{uri:imagePath}}/>
        </View>

       
        
      </View>

      <View style={styles.footerContainer}>

      <View>
          <TouchableOpacity onPress={lounchImagePicker}>
            <Text style={styles.textAdd}>Add New Image</Text>
          {/* <Button title='Upload image' onPress={uploadImage}/>
          <Button title='Download image' onPress={downloadImage} /> */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={cameraLaunch}>
            <Text style={styles.textAdd}>Camera</Text>
          {/* <Button title='Upload image' onPress={uploadImage}/>
          <Button title='Download image' onPress={downloadImage} /> */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={async () =>{
              await saveNoteDetails();
            }
          }
          >
            <Text style={styles.textAdd}>Save</Text>
          </TouchableOpacity>
        </View>
 
        <View>
          <TouchableOpacity onPress={async () =>{
              await saveNoteDetails();
              navigation.goBack();
            }
          }
          >
            <Text style={styles.returnText}>Return to List</Text>
          </TouchableOpacity>
        </View>
        
      </View>

    </View>
  )
}

export default NotePage;