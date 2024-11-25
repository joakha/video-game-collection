import { Text } from "react-native";
import { collectionPageStyles } from "../styles/CollectionPageStyles";

//RAWG API URLs for searching games
export const apiURL = "https://api.rawg.io/api";
export const apiKey = process.env.EXPO_PUBLIC_API_KEY;

//placeholder Image for rendering if game cover art not found
export const placeholderImage = require('../assets/placeholder-image.svg');

//component that renders if flatlist has no content
export const ListEmptyComponent = () => {
    return (
      <Text style={collectionPageStyles.text}>
        No games to show... Yet!
      </Text>
    )
  }