import { Card, Text, Button } from 'react-native-paper';
import { searchPageStyles } from '../../styles/SearchPageStyles';
import { firebaseApp } from '../../firebase/firebaseConfig';
import { getDatabase, ref, remove } from "firebase/database";
import { CollectionCardProps } from '../../interfaces/interfaces';

const CollectionCard = ({ game, navigation }: CollectionCardProps) => {

    const database = getDatabase(firebaseApp);

    const removeGame = (firebaseId: string) => {
        remove(ref(database, `myGames/${firebaseId}`));
    }   

    const titleString = game.name ? game.name : "Title not found!";
    const releaseYearString = game.released ? game.released.split("-")[0] : "Release year not found!";
    const genreString = game.genres ? game.genres.map(genre => genre.name).join(", ") : "Genre(s) not found!";
    const mainPlatformString = game.parent_platforms ? game.parent_platforms[0].platform.name : "Main platform not found!";

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
                <Button onPress={() => removeGame(game.firebaseId)}>Remove from Collection</Button>
                <Button onPress={() => navigation.navigate("Game Details", { gameId: game.gameId })}>Details</Button>
            </Card.Actions>
        </Card>
    )
}

export default CollectionCard