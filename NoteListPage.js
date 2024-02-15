
import { useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from './styles';
import Header from './Header';
import NoteInput from './NoteInput';
import NoteList from './NoteList';
import Footer from './Footer';

const NoteListPage = ({ navigation }) => {
  
  const [newNote, setNewNote] = useState('');
  const [noteList, setNoteList] = useState([]);

  const handleNoteList = () => {
    if (newNote.trim() === '') return;        //undgå tom note bliver tilføjet

    const newNoteItem = {key: noteList.length.toString, name:newNote}

    setNoteList([...noteList, newNoteItem]);  //Ny note til liste -> alt. ([...list, {key:list.length, value:text}])
    setNewNote('');                           //rydder inputfelt
  }

  const handleDelete = (keyDeleted) => {
    const newNoteList = noteList.filter(note => note.key !== keyDeleted)
    setNoteList(newNoteList);
  }

async function saveList(){
  try{
        const jsonValue = JSON.stringify(noteList)
        console.log(jsonValue)
        await AsyncStorage.setItem('@myList', jsonValue)
  }catch (error){}
}

async function loadList(){
  try {
    const jsonValue = await AsyncStorage.getItem('@myList')
    const arr = JSON.parse(jsonValue)
    if(arr != null){
      setNoteList(arr)
    }
  }catch (error){}
}

  return(
    <View style={styles.container}>
      <Header />
      <NoteInput 
        newNote={newNote}
        setNewNote={setNewNote}
        handleNoteList={handleNoteList}
      />
      <NoteList 
        noteList={noteList}
        handleDelete={handleDelete}
      />
      <Footer 
        saveList={saveList}
        loadList={loadList}
      /> 
    </View>

  )
}

export default NoteListPage;