import { Card, Text, Button } from 'react-native-paper';
import { searchPageStyles } from '../../styles/SearchPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, remove, update } from "firebase/database";
import { CollectionCardProps } from '../../interfaces/interfaces';
import { Alert } from 'react-native';

const CollectionCard = ({ game, navigation }: CollectionCardProps) => {

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

    const updateStatus = () => {
        update(ref(database, `myGames/${game.firebaseId}`), { name: "hello" });
    }

    return (
        <Card
            onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}
            style={searchPageStyles.gameCard}
        >
            <Card.Cover source={{ uri: game.backgroundImage }} />
            <Card.Title
                title={game.name} titleVariant='titleLarge'
                subtitle={game.released?.split("-")[0]}
            />
            <Card.Content>
                <Text variant="bodyLarge">{game.genres}</Text>
                <Text variant="bodyMedium">{game.parentPlatform}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={removeGame}>Remove</Button>
            </Card.Actions>
        </Card>
    )
}

export default CollectionCard