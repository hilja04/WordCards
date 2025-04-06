import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        borderColor: '#A9A9A9',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 0,
        width: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    text:{
        margin:10,
        fontSize: 14,
        textAlign:'center'

    },
    errorText:{
        margin:10,
        fontSize: 14,
        textAlign:'center',
        color:'red'
    },
    button: {
        backgroundColor: "#FF66CC",
        marginTop: 5,
        borderRadius: 10,
    },
    cancelButton: {
        marginVertical: 5,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
    },

    deck: {
        backgroundColor: '#E0B8FF',
        padding: 15,
        margin: 10,
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
        textAlign:'center',
        overflow: 'hidden',
    },
    deckDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        textAlign:'center',
        overflow: 'hidden',
    },
    card: {
        width: 300,
        height: 150,
        backgroundColor: '#E0B8FF',
        borderRadius: 15,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 10,
        overflow: 'hidden',
    },
    cardQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardAnswer: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column',
    },
    resultBox: {
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        width: '350',
      },
    
    
});

export default styles;
