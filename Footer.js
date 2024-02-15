import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const Footer = ({ saveList, loadList}) => (
  <View style={styles.footerContainer}>
    <View style={styles.saveBtn}>
      <TouchableOpacity onPress={saveList} >
        <Text style={styles.saveText}>Save Notelist</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.loadBtn}>
      <TouchableOpacity onPress={loadList} >
        <Text style={styles.loadText}>Get Notelist</Text>
      </TouchableOpacity>
    </View>
  </View>

);
export default Footer;
