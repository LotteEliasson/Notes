

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteListPage from './NoteListPage';
import NotePage from './NotePage';
export default function App() {

  const Stack = createNativeStackNavigator()

  return(
    //Single Entry Point
    <NavigationContainer>
      <Stack.Navigator initialRouteName='NoteListPage'>
        <Stack.Screen 
          name='NoteListPage'
          component={NoteListPage}
        />
           <Stack.Screen 
          name='NotePage'
          component={NotePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




