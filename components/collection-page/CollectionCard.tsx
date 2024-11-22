import { Card, Text, IconButton } from 'react-native-paper';
import { collectionPageStyles, collectionCardPickerStyles } from '../../styles/CollectionPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, remove, update } from "firebase/database";
import { CollectionCardProps, StatusOptions } from '../../types/types';
import { Picker } from '@react-native-picker/picker';
import { Alert, View } from 'react-native';
import { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';
import ArtWorkModal from './ArtworkModal';
import { placeholderImage } from '../../constants/constants';

const CollectionCard = ({ game, navigation }: CollectionCardProps) => {

    const [gameStatus, setGameStatus] = useState(game.status);
    const [imageError, setImageError] = useState(false);

    const gameStatusOptions: StatusOptions = {
        green: "Playing",
        blue: "Completed",
        orange: "Paused",
        red: "Dropped",
        grey: "Planned"
    };

    useEffect(() => {
        setImageError(false);
    }, [game.backgroundImage])

    const toggleFavorite = () => {
        update(ref(database, `myGames/${game.firebaseId}`), { isFavorite: !game.isFavorite });
    }

    const updateStatus = (itemValue: string) => {
        setGameStatus(itemValue)
        update(ref(database, `myGames/${game.firebaseId}`), { status: itemValue });
    }

    const removeGame = () => {
        Alert.alert("Warning", `Are you sure you want to remove ${game.name} from your collection?`, [
            {
                text: "Cancel",
            },
            {
                text: "Remove",
                onPress: () => remove(ref(database, `myGames/${game.firebaseId}`)),
                style: "destructive"
            }
        ]);
    }

    return (
        <Card
            onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}
            style={collectionPageStyles.collectionCard}
        >
            <Card.Cover
                source={imageError ? placeholderImage : { uri: game.backgroundImage }}
                onError={() => setImageError(true)}
            />
            <Card.Title
                title={game.name} titleVariant='titleLarge'
                subtitle={game.released?.split("-")[0]}
            />
            <Card.Content>
                <View style={collectionPageStyles.collectionCardContent}>
                    <View>
                        <Text variant="bodyLarge">{game.genres.length >= 24 ? `${game.genres.slice(0, 24)}...` : game.genres}</Text>
                        <Text variant="bodyMedium">{game.parentPlatform}</Text>
                    </View>
                    <ArtWorkModal
                        game={game}
                    />
                    <IconButton
                        icon={game.isFavorite ? "star" : "star-outline"}
                        onPress={toggleFavorite}
                        iconColor='cyan'
                    />
                </View>
            </Card.Content>
            <Card.Actions>
                <Picker
                    style={collectionCardPickerStyles}
                    mode='dropdown'
                    selectedValue={gameStatus}
                    onValueChange={(itemValue) => updateStatus(itemValue)}
                >
                    {
                        Object.keys(gameStatusOptions).map((status, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    color={status}
                                    label={gameStatusOptions[status as keyof StatusOptions]}
                                    value={gameStatusOptions[status as keyof StatusOptions]}
                                />
                            )
                        })
                    }
                </Picker>
                <ReviewModal game={game} />
                <IconButton
                    icon="trash-can"
                    onPress={removeGame}
                />
            </Card.Actions>
        </Card>
    )
}

export default CollectionCard