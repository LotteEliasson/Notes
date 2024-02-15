

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteListPage from './NoteListPage';

export default function App() {

  const Stack = createNativeStackNavigator()

  return(
    //Single Entry Point
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='NoteList'
          component={NoteListPage}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




