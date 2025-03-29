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
        overflow: 'hidden',
    },
    deckDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        overflow: 'hidden',
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
    },
});

export default styles;
