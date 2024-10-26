import { Card, Text, Button } from 'react-native-paper';
import { GameCardProps } from '../../interfaces/interfaces';
import { searchPageStyles } from '../../styles/AppStyles';

const GameCard = ({ game, navigation }: GameCardProps) => {

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
                <Button onPress={() => navigation.navigate("Game Details", {gameId: game.id})}>Show More</Button>
            </Card.Actions>
        </Card>
    )
}

export default GameCard