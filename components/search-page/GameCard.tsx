import { Card, Text, Button } from 'react-native-paper';
import { GameCardProps } from '../../interfaces/interfaces';
import { searchPageStyles } from '../../styles/SearchPageStyles';
import { firebaseApp } from '../../firebase/firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";

const GameCard = ({ game, navigation }: GameCardProps) => {

    const database = getDatabase(firebaseApp);

    const titleString = game.name ? game.name : "Title not found!";
    const releaseYearString = game.released ? game.released.split("-")[0] : "Release year not found!";
    const genreString = game.genres ? game.genres.map(genre => genre.name).join(", ") : "Genre(s) not found!";
    const mainPlatformString = game.parent_platforms ? game.parent_platforms[0].platform.name : "Main platform not found!";

    const addToCollection = () => {
        push(ref(database, 'myGames/'), game);
    }

    return (
        <Card style={searchPageStyles.gameCard}>
            {
                game.background_image ?
                    <Card.Cover source={{ uri: game.background_image }} /> :
                    <Card.Cover />
            }
            <Card.Title
                title={titleString} titleVariant='titleLarge'
                subtitle={releaseYearString}
            />
            <Card.Content>
                <Text variant="bodyLarge">{genreString}</Text>
                <Text variant="bodyMedium">{mainPlatformString}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={addToCollection}>Add to Collection</Button>
                <Button onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}>Details</Button>
            </Card.Actions>
        </Card>
    )
}

export default GameCard