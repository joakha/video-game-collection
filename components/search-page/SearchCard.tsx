import { Card, Text, Button } from 'react-native-paper';
import { SearchCardProps } from '../../interfaces/interfaces';
import { searchPageStyles } from '../../styles/SearchPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, push } from "firebase/database";
import { Alert } from 'react-native';

const SearchCard = ({ game, navigation }: SearchCardProps) => {

    const addToCollection = () => {
        push(ref(database, 'myGames/'), game);
        Alert.alert("Added", `${game.name} has been added to your game collection!`);
    }

    return (
        <Card
            onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}
            style={searchPageStyles.gameCard}
        >
            <Card.Cover source={{ uri: game.backgroundImage}} />
            <Card.Title
                title={game.name} titleVariant='titleLarge'
                subtitle={game.released?.split("-")[0]}
            />
            <Card.Content>
                <Text variant="bodyLarge">{game.genres}</Text>
                <Text variant="bodyMedium">{game.parentPlatform}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={addToCollection}>Add</Button>
            </Card.Actions>
        </Card>
    )
}

export default SearchCard