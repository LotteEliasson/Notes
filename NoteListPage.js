import { app, database, storage } from './firebase'
import { initializeApp } from 'firebase/app';
import { doc, deleteDoc, getFirestore, getDoc } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ref } from 'firebase/storage';
import 'react-native-get-random-values';
import { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, TextInput } from 'react-native';


import styles from './styles';
import Header from './Header';
import Footer from './Footer';
import { deleteObject } from 'firebase/storage';

const NoteListPage = ({ navigation }) => {
  
  const [newNote, setNewNote] = useState('');
  const [values, loading, error] = useCollection(collection(database, "notes"));
  
  const data = values?.docs.map((doc) => ({...doc.data(), id:doc.id})) //Skal tilføje data i NoteList for at hente fra FB!

  const handleNoteList = async() => {
    if (newNote.trim() === '') return;     //undgå tom note bliver tilføjet

    try{
      await addDoc(collection(database, "notes"), {
         text: newNote
      });      
      setNewNote('')

    } catch(err){
      console.log("error FB" +err)
    };
  };

  function handleNavigation(noteItem){
    navigation.navigate('NotePage', {
      details: noteItem,                
    });
  } 

  // const handleDelete = async (noteId) => {
  //   const noteRef = doc(database, "notes", noteId);
  //   try {
  //     const noteSnapshot = await getDoc(noteRef);
  //     if (!noteSnapshot.exists()) {
  //       console.log("Note not found");
  //       return;
  //     }
      
  //     const noteData = noteSnapshot.data();
  //     const detailsId = noteData.detailsId;
      
  //     // Step 3: Delete images
  //     await deleteImages(detailsId, noteData.images);
      
  //     // After images are deleted, delete the note document itself
  //     await deleteDoc(noteRef);
  
  //   } catch (err) {
  //     console.error("Error deleting note and details: ", err);
  //   }
  // };
  // const deleteImages = async (details, imagesArray) => {
  //   const deletePromises = imagesArray.map(async (image) => {
  //     const imagePath = `images/${noteId}/`;
  //     const imageRef = ref(storage, imagePath);
  //     return deleteObject(imageRef);
  //   });
  // 
  //   try {
  //     await Promise.all(deletePromises);
  //     console.log("All images deleted successfully.");
  //   } catch (err) {
  //     console.error("Error deleting images: ", err);
  //   }
  // };
  
  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(database, "notes", noteId));

      const imageRef = ref(storage, `image/noteId`);
      await deleteObject(imageRef);

    } catch (err) {
      console.error("Error deleting from firebase: ", err);
    }

  };

  return(
    <View style={styles.container}>
      
      <Header />

      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newNote}
            onChangeText={setNewNote}
            placeholder="Enter note name here"
            placeholderTextColor={'#b8d4b8'}
          />
      
            <TouchableOpacity title="Add" onPress={() =>handleNoteList()} style={styles.button}>
              <Text style={styles.buttonText}>Add Note</Text>  
            </TouchableOpacity>
        </View>

        <FlatList  
          data = {data}
          keyExtractor={(item) => item.id}  //Giver hver item i FlatList en unik key value.
          renderItem = {({item}) => (
            <View  style={styles.noteContainer}>
              
              <View style={styles.noteRow1}>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.buttonText}>
                  <Image source={require('./assets/trash.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
              </View>
              
              <View style={styles.noteRow2}>
                <Image source={require('./assets/icon.png')} style={{width: 5, height: 5}}/>
              </View>

              <View style={styles.noteRow3}>
                <TouchableOpacity title='NotePage' onPress= {() => {handleNavigation(item)}}>            
                  <Text style={styles.textList}>{item.text}</Text>
                </TouchableOpacity>
              </View>
        </View>
          )} 
          contentContainerStyle={styles.contentContainer}
          style={styles.outputContainer}
        />

      <Footer 
      /> 

    </View>

  )
}

export default NoteListPage;