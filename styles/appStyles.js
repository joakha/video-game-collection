import { StyleSheet } from "react-native";

//styles for search tab

export const searchStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  inputView: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center",
  },
  flatlistView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  gameCard: {
    width: 320,
    height: 375,
    marginBottom: 10
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  searchbar: {
    backgroundColor: "#77dd77",
    width: 300,
  },
  searchbarInput: {
    color: "white"
  },
  button: {
    marginTop: 20,
    padding: 5
  }
});

//styles for collection tab

export const collectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//styles for statistics tab

export const statisticsStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});