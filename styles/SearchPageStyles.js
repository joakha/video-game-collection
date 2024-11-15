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
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  searchCard: {
    width: 325,
    height: 375,
    marginBottom: 10
  },
  inputView: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "column",
    gap: 10,
  },
  paginationView : {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  searchView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
});

export const searchbarStyles = {
  style: {
    backgroundColor: "#77dd77",
    width: 200,
  },
  inputStyle: {
    color: "white",
  },
  placeholderTextColor: "white",
  selectionColor: "white",
  iconColor: "white",
  icon: "gamepad-variant"
};

export const buttonStyles = {
  iconColor: "white",
  containerColor: "#77dd77",
  size: 35
}
