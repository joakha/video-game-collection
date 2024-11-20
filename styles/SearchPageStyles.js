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
    marginBottom: 10,
    placeholderImage: require('../assets/placeholder-image.svg')
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
