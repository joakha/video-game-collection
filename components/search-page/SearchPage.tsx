import { Text, View, FlatList } from 'react-native';
import { searchPageStyles, searchbarStyles, searchButtonStyles } from '../../styles/SearchPageStyles';
import { useState } from 'react';
import { Searchbar, Button } from 'react-native-paper';
import { apiURL, apiKey } from '../../constants/constants';
import { GameCardEntity } from '../../interfaces/interfaces';
import GameCard from './GameCard';

const SearchPage = ({ navigation }) => {

  const [gameKeyword, setGameKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchGames, setSearchGames] = useState<GameCardEntity[]>([]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/games?key=${apiKey}&search=${gameKeyword.replaceAll(/ /g, "-")}&search_exact=true&ordering=-rating`);
      if (!response.ok) throw new Error("Issue fetching game(s) data!")
      const gamesData = await response.json();
      const formattedData: GameCardEntity[] = [];

      if (gamesData.results) (
        gamesData.results.forEach((game) => {
          const formattedGame: GameCardEntity = {
            gameId: game.id,
            name: game.name,
            platforms: game.platforms,
            stores: game.stores,
            released: game.released,
            background_image: game.background_image,
            rating: game.rating,
            metacritic: game.metacritic,
            tags: game.tags,
            parent_platforms: game.parent_platforms,
            genres: game.genres
          }

          formattedData.push(formattedGame);
        })
      )

      setSearchGames(formattedData);
      setLoading(false);
      setGameKeyword("");
    } catch (err) {
      console.error(err);
    }
  }

  const ListEmptyComponent = () => {
    return (
      <Text style={searchPageStyles.text}>
        No games to show... Yet!
      </Text>
    )
  }

  return (
    <View style={searchPageStyles.body}>

      <View style={searchPageStyles.flatlistView}>
        {
          loading ?
            <Text style={searchPageStyles.text}>Loading...</Text> :
            <FlatList
              data={searchGames}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({ item }) => {
                return (
                  <GameCard game={item} navigation={navigation} />
                )
              }}
            />
        }
      </View>

      <View style={searchPageStyles.inputView}>
        <Searchbar
          placeholder="Type a game title"
          onChangeText={setGameKeyword}
          value={gameKeyword}
          style={searchbarStyles.style}
          inputStyle={searchbarStyles.inputStyle}
          placeholderTextColor={searchbarStyles.placeholderTextColor}
          selectionColor={searchbarStyles.selectionColor}
          iconColor={searchbarStyles.iconColor}
          icon={searchbarStyles.icon}
        />
        <Button
          icon={searchButtonStyles.icon}
          buttonColor={searchButtonStyles.buttonColor}
          style={searchButtonStyles.style}
          textColor={searchButtonStyles.textColor}
          onPress={fetchGames}
        >
          Search games
        </Button>
      </View>

    </View>
  );
}

export default SearchPage