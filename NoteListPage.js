import { app, database } from './firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from './styles';
import Header from './Header';
import NoteListInput from './NoteListInput';
import NoteList from './NoteList';
import Footer from './Footer';

const NoteListPage = ({ navigation }) => {
  
  const [newNote, setNewNote] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const data = values?.docs.map((doc) => ({...doc.data(), id:doc.id})) //Skal tilføje data i NoteList for at hente fra FB!


  // alert (JSON.stringify(database, null, 4))

  // function savePressed(){
  //   addDoc(collection(database, "notes"), {
  //     text: "hej fra klient"
  //   })
  // }


  async function saveList(){
    try{
          const jsonValue = JSON.stringify(noteList)
          console.log(jsonValue)
          await AsyncStorage.setItem('@myList', jsonValue)
    }catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
  if (noteList.length > 0) {
    saveList();
  }
  }, [noteList]);


  const handleNoteList = async() => {
    if (newNote.trim() === '') return;     //undgå tom note bliver tilføjet

    const newNoteItem = {key: uuidv4(), name:newNote}

    setNoteList([...noteList, newNoteItem]);  //Ny note til liste -> alt. ([...list, {key:list.length, value:text}])
    setNewNote('');                           //rydder inputfelt

    try{
      await addDoc(collection(database, "notes"), {
        newNote
      });
    } catch(err){
      console.log("error FB" +err)
    };
  };

  function handleNavigation(noteItem){
    navigation.navigate('NotePage', {
      noteDetails: noteItem,
      
    });
  } 

  const handleDelete = (keyDeleted) => {
    const newNoteList = noteList.filter(note => note.key !== keyDeleted)
    setNoteList(newNoteList);


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

  useEffect(()=> {
      loadList()
  }, []);


  return(
    <View style={styles.container}>
      <Header />
      <NoteListInput 
        newNote={newNote}
        setNewNote={setNewNote}
        handleNoteList={handleNoteList}
        saveList={saveList}
      />
      <NoteList 
        noteList={noteList}
        handleDelete={handleDelete}
        handleNavigation={handleNavigation}
      />
      <Footer 
        saveList={saveList}
        loadList={loadList}
      /> 
    </View>

  )
}

export default NoteListPage;