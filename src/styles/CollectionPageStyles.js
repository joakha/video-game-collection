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
    marginBottom: 8,
    marginTop: 8,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center"
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
    width: 325,
    height: 375,
    marginBottom: 10,
    placeholderImage: require('../assets/placeholder-image.svg')
  },
  collectionCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  }
});

export const collectionFilterPickerStyles = {
  width: 160,
  backgroundColor: "#77dd77",
  color: "white"
};

export const collectionSortPickerStyles = {
  width: 130,
  backgroundColor: "#77dd77",
  color: "white",
};

export const collectionCardPickerStyles = {
  width: 160,
};
