import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';


const NoteInput =({ newNote, setNewNote, handleNoteList}) => (
<View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newNote}
            onChangeText={setNewNote}
            placeholder="Enter new note here"
          />
      
            <TouchableOpacity title="Add" onPress={ handleNoteList } style={styles.button}>
              <Text style={styles.buttonText}>Add Note</Text>  
            </TouchableOpacity>
        </View>


);

export default NoteInput;