import { View, Text, Image, ScrollView } from "react-native"
import { detailsPageStyles } from "../../styles/AppStyles"
import { useState, useEffect } from "react";
import { apiURL, apiKey } from "../../constants/constants";
import { DetailEntity } from "../../interfaces/interfaces";

const DetailsPage = ({ route }) => {

    const { gameId } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [gameDetails, setGameDetails] = useState<DetailEntity>({ name: "" });

    const fetchGameData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/games/${gameId}?key=${apiKey}`);
            const gameData = await response.json();
            let formattedData: DetailEntity = { name: "" };

            if (gameData.detail !== "Not found.") {
                formattedData = formatFetchData(gameData);
            }

            setGameDetails(formattedData);
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    //received json is complicated so it is formatted here for ease of use later
    const formatFetchData = (gameData): DetailEntity => {
        const parentPlatforms: string = gameData.parent_platforms.map(parentPlatform => parentPlatform.platform.name).join(", ") || "";
        const platforms: string = gameData.platforms.map(platform => platform.platform.name).join(", ") || "";
        const stores: string = gameData.stores.map(store => store.store.domain).join(", ") || "";

        const developers: string = gameData.developers.map(developer => developer.name).join(", ") || "";
        const genres: string = gameData.genres.map(genre => genre.name).join(", ") || "";
        const tags: string = gameData.tags.map(tag => tag.name).join(", ") || "";
        const publishers: string = gameData.publishers.map(publisher => publisher.name).join(", ") || "";

        return {
            name: gameData.name,
            metacritic: gameData.metacritic,
            released: gameData.released,
            backgroundImage: gameData.background_image,
            backgroundImageAdditional: gameData.background_image_additional,
            parentPlatforms: parentPlatforms,
            platforms: platforms,
            stores: stores,
            developers: developers,
            genres: genres,
            tags: tags,
            publishers: publishers,
            descriptionRaw: gameData.description_raw
        }
    }

    useEffect(() => {
        fetchGameData();
    }, []);

    return (
        <ScrollView style={detailsPageStyles.scrollView}>
            <View style={detailsPageStyles.body}>
                {
                    loading ?
                        <Text>Loading game data...</Text> :
                        <View style={detailsPageStyles.detailsView}>
                            <Image
                                source={{ uri: gameDetails.backgroundImageAdditional }}
                                style={detailsPageStyles.image}
                            />
                            <Text style={detailsPageStyles.headerText}>{gameDetails.name}</Text>
                            <Text style={detailsPageStyles.releaseText}>{gameDetails.released?.split("-")[0]}</Text>
                            <Text style={detailsPageStyles.infoText}>{gameDetails.descriptionRaw?.slice(0, 150)}...</Text>
                            <Text style={detailsPageStyles.infoText}><Text style={detailsPageStyles.nestedText}>Published by: </Text>{gameDetails.publishers}</Text>
                            <Text style={detailsPageStyles.infoText}><Text style={detailsPageStyles.nestedText}>Developed by: </Text>{gameDetails.developers}</Text>
                            <Text style={detailsPageStyles.infoText}><Text style={detailsPageStyles.nestedText}>Platforms: </Text>{gameDetails.platforms}</Text>
                            <Text style={detailsPageStyles.infoText}><Text style={detailsPageStyles.nestedText}>Stores: </Text>{gameDetails.stores}</Text>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

export default DetailsPage