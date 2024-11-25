import { StyleSheet } from "react-native";

//styles for search page
export const searchPageStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  flatlistView: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10
  },
  searchCard: {
    width: 175,
    height: 375,
    marginBottom: 30,
    marginRight: 10,
  },
  inCollectionText: {
    fontSize: 12
  },
  searchButton: {
    justifyContent: "center"
  },
  paginationButton: {
    width: 40
  },
  inputView: {
    marginBottom: 15,
    marginTop: 15,
    gap: 10,
  },
  paginationView: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
  },
  placeHolderView: {
    width: 52
  },
  searchView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "78%"
  },
});

export const searchButtonProps = {
  buttonColor: "#77dd77",
  buttonSize: 35,
  textColor: "white"
}