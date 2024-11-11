import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native"
import { detailsPageStyles } from "../../styles/DetailsPageStyles";
import { useState, useEffect } from "react";
import { apiURL, apiKey } from "../../constants/constants";
import { GameDetails } from "../../interfaces/interfaces";

const DetailsPage = ({ route }) => {

    const { gameId } = route.params;
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const [gameDetails, setGameDetails] = useState<GameDetails>({
        name: "",
        released: "",
        backgroundImageAdditional: "",
        platforms: "",
        stores: "",
        developers: "",
        tags: "",
        publishers: "",
        descriptionRaw: ""
    });

    const fetchGameDetails = async () => {
        try {
            setLoadingDetails(true);
            const response = await fetch(`${apiURL}/games/${gameId}?key=${apiKey}`);
            const gameData = await response.json();
            let formattedData: GameDetails = {
                name: "",
                released: "",
                backgroundImageAdditional: "",
                platforms: "",
                stores: "",
                developers: "",
                tags: "",
                publishers: "",
                descriptionRaw: ""
            };

            if (gameData.detail !== "Not found.") {
                formattedData = formatFetchData(gameData);
            }

            setGameDetails(formattedData);
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingDetails(false);
        }
    }

    //received json is complicated so it is formatted here for ease of use later
    const formatFetchData = (gameData): GameDetails => {
        const platforms: string = gameData.platforms?.map(platform => platform.platform.name).join(", ");
        const stores: string = gameData.stores?.map(store => store.store.domain).join(", ");

        const developers: string = gameData.developers?.map(developer => developer.name).join(", ");
        const tags: string = gameData.tags?.map(tag => tag.name).join(", ");
        const publishers: string = gameData.publishers?.map(publisher => publisher.name).join(", ");

        return {
            name: gameData.name,
            released: gameData.released,
            backgroundImageAdditional: gameData.background_image_additional,
            platforms: platforms,
            stores: stores,
            developers: developers,
            tags: tags,
            publishers: publishers,
            descriptionRaw: gameData.description_raw
        }
    }

    useEffect(() => {
        fetchGameDetails();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={detailsPageStyles.contentContainer}
            style={detailsPageStyles.scrollView}
        >
            {
                loadingDetails ? (
                    <ActivityIndicator size="large" />
                ) : (
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
                )
            }
        </ScrollView>
    )
}

export default DetailsPage