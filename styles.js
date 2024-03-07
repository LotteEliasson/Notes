import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#252625',
    // alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  
  },
  headerContainer:{
    flex:0,
    paddingTop:50,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outputContainer:{
    flex: 1,
    width: '100%',
    paddingLeft: 15,
   },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#252625',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  footerContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  noteRow1: {
    padding: 10
  },
  noteRow2: {
    
  },
  noteRow3: {
    paddingLeft: 5 
  },
  imageDB: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '65%',
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#b8d4b8',
    borderWidth: 0,
    padding: 10,
    color: '#b8d4b8'
  },
  buttonText: {
    color: '#b8d4b8',
  },
  text: {
    color: '#b8d4b8',
    fontSize: 20,
  },
  textList: {
    color: '#b8d4b8',
    paddingRight: 100
  },
  saveBtn:{
    paddingRight: 10,
  },
  saveText:{
    color: '#b8d4b8',
    fontSize: 17,
  },
  returnText: {
    color: '#b8d4b8',
    fontSize: 17,
  },
  textAdd: {
    color: '#b8d4b8',
    fontSize: 17,
    paddingRight: 20,
  },

  loadBtn: {
    
  },
  loadText: {
    color: '#b8d4b8',
    fontSize: 17,
  },

  noteDetailContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },

  noteDetailInput:{
    flex: 1,
    width: '100%',
    color: '#b8d4b8',
   
    
  },


});