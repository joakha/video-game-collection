import { StyleSheet } from "react-native"

//styles for details page
export const detailsPageStyles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: 'gray',
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    detailsView: {
      alignItems: "center",
      marginTop: 30,
    },
    image: {
      width: 350,
      height: 350,
      borderRadius: 5,
    },
    headerText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25,
      marginTop: 25,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      textAlign: "center"
    },
    releaseText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
    },
    infoText: {
      marginTop: 10,
      fontSize: 15,
      color: "white",
      marginLeft: 30,
      marginRight: 30,
      textAlign: "center"
    },
    nestedText: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#77dd77",
    },
  })
  