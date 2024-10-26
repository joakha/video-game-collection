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

export const detailsPageStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'gray',
  },
  body: {
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
    fontSize: 25,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center"
  },
  releaseText: {
    color: "white",
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
    fontSize: 16,
    color: "#77dd77"
  },
})

//styles for collection page

export const collectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//styles for statistics page

export const statisticsStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
