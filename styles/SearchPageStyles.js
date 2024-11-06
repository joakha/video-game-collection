import { StyleSheet } from "react-native";

//styles for search page
export const searchPageStyles = StyleSheet.create({
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
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  gameCard: {
    width: 320,
    height: 375,
    marginBottom: 10
  },
});

export const searchbarStyles = {
  style: {
    backgroundColor: "#77dd77",
    width: 300,
  },
  inputStyle: {
    color: "white",
  },
  placeholderTextColor: "white",
  selectionColor: "white",
  iconColor: "white",
  icon: "gamepad-variant"
};

export const searchButtonStyles = {
  style: {
    marginTop: 20,
    padding: 5
  },
  icon: "search-web",
  buttonColor: "#77dd77",
  textColor: "white"
}
