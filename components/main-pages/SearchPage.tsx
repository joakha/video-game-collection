import { Text, View, FlatList } from 'react-native';
import { searchStyles } from '../../styles/AppStyles';
import { useState } from 'react';
import { Searchbar, Button } from 'react-native-paper';
import { apiURL } from '../../constants/constants';
import { GameCardEntity } from '../../interfaces/interfaces';
import GameCard from '../GameCard';

const SearchPage = () => {

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  const [gameKeyword, setGameKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchGames, setSearchGames] = useState<GameCardEntity[]>([]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}games?key=${apiKey}&search=${gameKeyword.replaceAll(/ /g, "-")}&search_exact=true&ordering=-rating`);
      if (!response.ok) throw new Error("Issue fetching game(s) data!")
      const gamesData = await response.json();
      const formattedData: GameCardEntity[] = [];

      if (gamesData.results) (
        gamesData.results.forEach((game) => {
          const formattedGame: GameCardEntity = {
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
      <Text style={searchStyles.text}>
        No games to show... Yet!
      </Text>
    )
  }

  return (
    <View style={searchStyles.body}>

      <View style={searchStyles.flatlistView}>
        {
          loading ?
            <Text style={searchStyles.text}>Loading...</Text> :
            <FlatList
              data={searchGames}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({ item }) => {
                return (
                  <GameCard game={item} />
                )
              }}
            />
        }
      </View>

      <View style={searchStyles.inputView}>
        <Searchbar
          placeholder="Type a game title"
          onChangeText={setGameKeyword}
          value={gameKeyword}
          style={searchStyles.searchbar}
          inputStyle={searchStyles.searchbarInput}
          placeholderTextColor="white"
          selectionColor="white"
          iconColor='white'
          icon="gamepad-variant"
        />
        <Button
          icon="search-web"
          buttonColor='#77dd77'
          style={searchStyles.button}
          textColor='white'
          onPress={fetchGames}
        >
          Search games
        </Button>
      </View>

    </View>
  );
}

export default SearchPage