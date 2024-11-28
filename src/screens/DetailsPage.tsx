import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native"
import { detailsPageStyles } from "../styles/DetailsPageStyles";
import { useState, useEffect } from "react";
import { placeholderImage } from "../constants/constants";
import { GameDetails, DetailsPageProps } from "../types/types";
import { fetchGameDetails } from "../api/apiCalls";

const DetailsPage = ({ route }: DetailsPageProps) => {

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

    const getGameDetails = async () => {
        try {
            setLoadingDetails(true);
            const detailsData = await fetchGameDetails(gameId);
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

            if (detailsData.detail !== "Not found.") {
                formattedData = formatDetailsData(detailsData);
            }

            setGameDetails(formattedData);
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingDetails(false);
        }
    }

    //received json is complicated so it is formatted here for ease of use later
    const formatDetailsData = (detailsData: any): GameDetails => {
        const platforms: string = detailsData.platforms?.map((platform: any) => platform.platform.name).join(", ");
        const stores: string = detailsData.stores?.map((store: any) => store.store.domain).join(", ");

        const developers: string = detailsData.developers?.map((developer: any) => developer.name).join(", ");
        const tags: string = detailsData.tags?.map((tag: any) => tag.name).join(", ");
        const publishers: string = detailsData.publishers?.map((publisher: any) => publisher.name).join(", ");

        return {
            name: detailsData.name,
            released: detailsData.released,
            backgroundImageAdditional: detailsData.background_image_additional,
            platforms: platforms,
            stores: stores,
            developers: developers,
            tags: tags,
            publishers: publishers,
            descriptionRaw: detailsData.description_raw
        }
    }

    useEffect(() => {
        getGameDetails();
    }, []);

    return (
        <ScrollView style={detailsPageStyles.scrollView}>
            {
                loadingDetails ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <View style={detailsPageStyles.detailsView}>
                        <Image
                            source={gameDetails.backgroundImageAdditional ? { uri: gameDetails.backgroundImageAdditional } : placeholderImage}
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