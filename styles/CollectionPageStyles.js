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
    width: 325,
    height: 375,
    marginBottom: 10
  },
  collectionCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export const reviewModalStyles = StyleSheet.create({
  modalBody: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    width: 325,
    height: 500,
  },
  contentBody: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  headerText: {
    fontSize: 16,
    marginBottom: 20
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  }
});

export const modalPickerStyles = {
  width: 120,
  backgroundColor: "#77dd77",
  color: "white",
  marginTop: 20
}