import { Card, Text, IconButton } from 'react-native-paper';
import { collectionPageStyles } from '../../styles/CollectionPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, remove, update } from "firebase/database";
import { CollectionCardProps, StatusOptions } from '../../interfaces/interfaces';
import { Picker } from '@react-native-picker/picker';
import { Alert, View } from 'react-native';
import { useState } from 'react';
import { collectionCardPickerStyles } from '../../styles/CollectionPageStyles';
import ReviewModal from './ReviewModal';

const CollectionCard = ({ game, navigation }: CollectionCardProps) => {

    const [gameStatus, setGameStatus] = useState(game.status);

    const gameStatusOptions: StatusOptions = {
        green: "Playing",
        blue: "Completed",
        orange: "Paused",
        red: "Dropped",
        grey: "Planned"
    };

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
            <Card.Cover source={game.backgroundImage ? { uri: game.backgroundImage } : collectionPageStyles.collectionCard.placeholderImage} />
            <Card.Title
                title={game.name} titleVariant='titleLarge'
                subtitle={game.released?.split("-")[0]}
            />
            <Card.Content>
                <View style={collectionPageStyles.collectionCardContent}>
                    <View>
                        <Text variant="bodyLarge">{game.genres}</Text>
                        <Text variant="bodyMedium">{game.parentPlatform}</Text>
                    </View>
                    <View>
                        <IconButton
                            icon={game.isFavorite ? "star" : "star-outline"}
                            onPress={toggleFavorite}
                            iconColor='cyan'
                        />
                    </View>
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