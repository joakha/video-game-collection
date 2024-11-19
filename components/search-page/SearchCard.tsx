import { Card, Text, Button, IconButton } from 'react-native-paper';
import { SearchCardProps } from '../../interfaces/interfaces';
import { searchPageStyles } from '../../styles/SearchPageStyles';
import { database } from '../../firebase/firebaseConfig';
import { ref, push } from "firebase/database";
import { Alert } from 'react-native';
import useGame from '../../hooks/useGame';

const SearchCard = ({ game, navigation }: SearchCardProps) => {

    const { myGames } = useGame();

    const gameInCollection: boolean = myGames.some(collectionGame => collectionGame.gameId === game.gameId);

    const addToCollection = () => {
        push(ref(database, 'myGames/'), { ...game, status: "Planned", review: "", reviewScore: 0, isFavorite: false });
        Alert.alert("Added", `${game.name} has been added to your game collection!`);
    }

    return (
        <Card
            onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}
            style={searchPageStyles.searchCard}
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
                {
                    gameInCollection ? (
                        <>
                            <Text>Game in Collection</Text>
                            <IconButton icon="check" iconColor='green' />
                        </>
                    ) : (
                        <Button onPress={addToCollection}>Add</Button>
                    )
                }
            </Card.Actions>
        </Card>
    )
}

export default SearchCard