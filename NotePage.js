import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react';
import styles from './styles';
;



const NotePage = ({ navigation, route }) => {

  const [newNoteDetails, setNewNoteDetails] = useState ('');

  const noteDetails = route.params?.noteDetails;

  useEffect(() => {
    async function loadNote(){
      try {
        const jsonValue = await AsyncStorage.getItem(`note_${noteDetails.key}`);
        if (jsonValue !== null){
          setNewNoteDetails(JSON.parse(jsonValue));
        } else {
          setNewNoteDetails('');
        }
      }catch(error) {
        console.error('failed to load note', error)
      }
    }
    loadNote();
  }, [noteDetails.key]);

  async function saveNote(){
    try{
          const jsonValue = JSON.stringify(newNoteDetails)
          console.log(jsonValue)
          await AsyncStorage.setItem(`note_${noteDetails.key}`, jsonValue);
          console.log('note saved')
    }catch (error){
      console.log('note didnt get saved')
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.text}>Note: {noteDetails.name}</Text>
      </View>
      <View style={styles.noteDetailContainer}>
        <TextInput
          multiline
          textAlign='top'
          value={newNoteDetails}
          onChangeText={text => setNewNoteDetails(text)}
          placeholder='Add notes here....'
          placeholderTextColor={'#b8d4b8'}
          style={styles.noteDetailInput}
        />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.saveBtn}>
          <TouchableOpacity onPress={saveNote}>
            <Text style={styles.saveText}>Save Note</Text>
          </TouchableOpacity> 
        </View>

        <View>
          <TouchableOpacity onPress={async () =>{
              await saveNote();
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