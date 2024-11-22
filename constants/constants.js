import { Text } from "react-native";
import { collectionPageStyles } from "../styles/CollectionPageStyles";

export const apiURL = "https://api.rawg.io/api";
export const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const placeholderImage = require('../assets/placeholder-image.svg');

export const ListEmptyComponent = () => {
    return (
      <Text style={collectionPageStyles.text}>
        No games to show... Yet!
      </Text>
    )
  }