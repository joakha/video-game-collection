import { Card, Text, Button } from 'react-native-paper';
import { collectionPageStyles } from '../../styles/CollectionPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, remove, update } from "firebase/database";
import { CollectionCardProps } from '../../interfaces/interfaces';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { useState } from 'react';

const CollectionCard = ({ game, navigation }: CollectionCardProps) => {

    const [gameStatus, setGameStatus] = useState(game.status);

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

    const updateStatus = (itemValue) => {
        setGameStatus(itemValue)
        update(ref(database, `myGames/${game.firebaseId}`), { status: itemValue });
    }

    const gameStatusOptions = {
        Playing: "green",
        Completed: "blue",
        Paused: "orange",
        Dropped: "red",
        Planned: "grey"
    }

    return (
        <Card
            onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}
            style={collectionPageStyles.collectionCard}
        >
            {
                game.backgroundImage && <Card.Cover source={{ uri: game.backgroundImage }} />
            }
            <Card.Title
                title={game.name} titleVariant='titleLarge'
                subtitle={game.released?.split("-")[0]}
            />
            <Card.Content>
                <Text variant="bodyLarge">{game.genres}</Text>
                <Text variant="bodyMedium">{game.parentPlatform}</Text>
            </Card.Content>
            <Card.Actions>
                <Picker
                    style={{ width: 160 }}
                    mode='dropdown'
                    selectedValue={gameStatus}
                    onValueChange={(itemValue, itemIndex) =>
                        updateStatus(itemValue)
                    }
                >
                    {
                        Object.keys(gameStatusOptions).map(status => {
                            return <Picker.Item color={gameStatusOptions[status]} label={status} value={status} />
                        })
                    }
                </Picker>
                <Button onPress={removeGame}>Remove</Button>
            </Card.Actions>
        </Card>
    )
}

export default CollectionCard