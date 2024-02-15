import { View, Text } from 'react-native';
import styles from './styles';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.text}>My Notes</Text>
  </View> 

);

export default Header;