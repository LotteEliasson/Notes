import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';


const NoteList = ({noteList, handleDelete}) => (

  <FlatList  
          data = {noteList}
          renderItem = {({ item}) => (
            <View  style={styles.noteContainer}>
              
              <View style={styles.noteRow1}>
              <TouchableOpacity onPress={() => handleDelete(item.key)} style={styles.buttonText}>
                <Image source={require('./assets/trash.png')} style={{width: 20, height: 20}}/>
              </TouchableOpacity>
              </View>
              
              <View style={styles.noteRow2}>
              <Image source={require('./assets/icon.png')} style={{width: 5, height: 5}}/>
              </View>

              <View style={styles.noteRow3}>              
              <Text style={styles.textList}>{item.name}</Text>
              </View>
        </View>
          )}
         
          contentContainerStyle={styles.contentContainer}
          style={styles.outputContainer}
        />
)

export default NoteList;