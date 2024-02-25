
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { database } from './firebase';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import styles from './styles';
;



const NotePage = ({ navigation, route }) => {

  const [noteDetails, setNoteDetails] = useState ('');
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
    getNoteDetails();
  }, [details.id]);


  const saveNoteDetails = async () => {
    const noteRef = doc(database, "notes", details.id);
    try {
      await updateDoc(noteRef, {
        details: noteDetails
      });
      console.log("NoteDetails saved");
    } catch(err) {
      console.error("Error updating Note", err);
    }
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

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={async () =>{
            await saveNoteDetails();
            navigation.goBack();
          }
        }
            >
          <Text style={styles.returnText}>Save and return to List</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default NotePage;