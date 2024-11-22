import { StyleSheet } from "react-native";

export const artworkModalStyles = StyleSheet.create({
    modalStyle: {
        alignItems: "center"
    },
    contentContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 10,
        width: 325,
        height: 500,
    },
    contentBody: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    headerText: {
        fontSize: 16,
        marginBottom: 20
    },
    text: {
        marginBottom: 10
    },
    buttonView: {
        flexDirection: "row",
        gap: 5,
        marginTop: 20
    },
    button: {
        padding: 5
    },
    exitView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },
    imageView: {
        alignItems: "center",
    },
    image: {
        width: 275,
        height: 275,
    }
});

export const artworkButtonProps = {
    backgroundColor: "#77dd77",
    color: "white",
}
