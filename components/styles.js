import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 50,
    borderColor: '#A9A9A9', 
    borderWidth: 2,      
    marginTop:10, 
    marginBottom: 0,    
    width: '70%',       
  },
  button: {
    backgroundColor: "#FF66CC",
    marginTop: 5,
  },
  deck: {
    backgroundColor: '#E0B8FF',
    padding: 15,
    margin:10,
    borderRadius: 15,
    borderColor: '#E0B8FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10, 
    height: 150, 
    width: 320, 
    justifyContent: 'flex-start', 
    overflow: 'hidden',  
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    overflow: 'hidden',  
  },
  deckDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    overflow: 'hidden',  // Hide overflowed description text  

},
});

export default styles; 