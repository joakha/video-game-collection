import { StyleSheet } from "react-native";

//styles for collection page
export const collectionPageStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  inputView: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "row",
    gap: 15,
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
    fontWeight: "bold"
  },
  collectionCard: {
    width: 320,
    height: 375,
    marginBottom: 10
  },
});

export const collectionFilterPickerStyles = {
  width: 160,
  backgroundColor: "#77dd77",
  color: "white"
}

export const collectionSortPickerStyles = {
  width: 125,
  backgroundColor: "#77dd77",
  color: "white"
}
