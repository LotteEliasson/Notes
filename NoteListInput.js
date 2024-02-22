import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';


const NoteListInput =({ newNote, setNewNote, handleNoteList}) => (
<View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newNote}
            onChangeText={setNewNote}
            placeholder="Enter note name here"
            placeholderTextColor={'#b8d4b8'}
          />
      
            <TouchableOpacity title="Add" onPress={() =>handleNoteList()}
              
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Note</Text>  
            </TouchableOpacity>
        </View>


);

export default NoteListInput;