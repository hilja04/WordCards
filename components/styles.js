import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3B0A45',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        borderColor: '#B27ACF',
        borderWidth: 2,
        marginTop: 10,
        width: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        color: '#333',
    },
    text: {
        margin: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF',
    },
    text2: {
        margin: 10,
        fontSize: 12,
        textAlign: 'center',
        color: '#FFF',
    },
    textBlack: {
        margin: 10,
        fontSize: 12,
        textAlign: 'center',
        color: '#black',
    },
    errorText: {
        margin: 10,
        fontSize: 14,
        textAlign: 'center',
        color: 'red',
    },
    button: {
        backgroundColor: "#C55FFC",
        margin: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    gameButton: {
        backgroundColor: "#3C63A8",
        margin: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    cancelButton: {
        backgroundColor: '#808080',
        margin:3,
        borderWidth: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

    },

    deck: {
        backgroundColor: '#D7A9F0',
        padding: 15,
        margin: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        height: 150,
        width: 320,
        justifyContent: 'flex-start',
    },
    deckTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
    deckDescription: {
        fontSize: 14,
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    card: {
        width: 300,
        height: 150,
        backgroundColor: '#CB95E8',
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    cardQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3A0057',
    },
    cardAnswer: {
        fontSize: 16,
        textAlign: 'center',
        color: '#5D3C6B',
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '90%',
        height: 350,
        backgroundColor: '#55215F',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    resultBox: {
        margin: 10,
        padding: 10,
        borderColor: '#B27ACF',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#CB95E8',
        width: 350,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: 'black',
    },

});

export default styles;
