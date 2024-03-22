
import { doc, updateDoc, getDoc, collection } from 'firebase/firestore';
import { database } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { View, Text, TouchableOpacity, TextInput, Image, Pressable, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const NotePage = ({ navigation, route }) => {

  const [noteDetails, setNoteDetails] = useState ('')
  const [images, setImages] = useState ([])
  const details = route.params?.details;
  const [values, loading, error] = useCollection(collection(database, "notes"));
  

  useEffect(() => {
     
    const getNoteDetails = async () =>{
      const noteRef = doc(database, "notes", details.id);
      try{
        const getDetails = await getDoc(noteRef);
        if(getDetails.exists()){
          const noteData = getDetails.data();
          setNoteDetails(noteData.details || '');
          setImages(noteData.images || []);
        } else {
          console.log("No note found");
        }
      }catch(err){
        console.error("Error fetching note document", err);
      }
    };
      getNoteDetails();
  }, [details.id]);

  const saveNoteDetails = async () => {
    const noteRef = doc(database, "notes", details.id);
    try {
      await updateDoc(noteRef, {
        details: noteDetails,
      });
     
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
        // setImagePath(response.assets[0].uri)
        uploadImage(response.assets[0].uri)
      })
    }
  }

  async function launchImagePicker(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowEditing: true
    })
    if(!result.canceled){
      // setImagePath(result.assets[0].uri)
      uploadImage(result.assets[0].uri)
    }
  }

  async function uploadImage(imageUri){
    const imageId = uuidv4();
    try{
      const res = await fetch(imageUri)
      const blob = await res.blob()
      const storageRef = ref(storage, `images/${details.id}/${imageId}.jpg`)
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
      addImageToNote(imageId, imageUrl);
      alert("ImageUploaded");

    }catch (err) {
      console.error("Error uploading image", err);
    }
  }

  async function addImageToNote(imageId, imageUrl) {
    const noteRef = doc(database, "notes", details.id);
    try {
      const updatedImages = [...images, { id: imageId, url: imageUrl }];
      await updateDoc(noteRef, { images: updatedImages }); // Firestore update
  
      setImages(updatedImages); // Local state update
    } catch (err) {
      console.error("Error adding image to note", err);
    }
  }
  

const deleteImage = async (imageId) => {

  try {
    const imageRef = ref(storage, `images/${details.id}/${imageId}.jpg`);
    await deleteObject(imageRef);

  } catch (err) {
    console.error("Error deleting from firebase: ", err);
  }
   try {
    const updatedImages = images.filter(image => image.id !== imageId);
    const noteRef = doc(database, "notes", details.id);
    await updateDoc(noteRef, {
      images: updatedImages,
    });
    setImages(updatedImages);
  } catch (err) {
    console.error("Error updating Firestore document: ", err);
  }
};


  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.back}>
        <TouchableOpacity onPress={async () =>{
              await saveNoteDetails();
              navigation.goBack();
            }
          }
          >
          <Image source={require('./assets/back.png')} style={{width: 20, height: 10}}/>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>Note: {details.text}</Text>
        </View>
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
     
      <View style={styles.imageContainer}>
        <FlatList  
          data = {images}
          horizontal={true}
          keyExtractor={(item) => item.id}  //Giver hver item i FlatList en unik key value.
          renderItem = {({item}) => (
            <View style={styles.imageDB}>
              
                <Image style={{width: 150, height: 150}} source={{uri:item.url}}/>
                <Pressable onPress={() => deleteImage(item.id)}>
                  <Text style={styles.textAdd}>Delete</Text>
                </Pressable>
          
            </View>
          )}
        />
      </View>

      <View style={styles.footerContainer}>
      

        <View>
          <TouchableOpacity onPress={launchImagePicker}>
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

        
      </View>

    </View>
  )
}

export default NotePage;