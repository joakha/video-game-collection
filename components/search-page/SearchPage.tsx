import { Text, View, FlatList } from 'react-native';
import { searchPageStyles, searchbarStyles, searchButtonStyles } from '../../styles/SearchPageStyles';
import { useState } from 'react';
import { Searchbar, Button } from 'react-native-paper';
import { apiURL, apiKey } from '../../constants/constants';
import { SearchGame } from '../../interfaces/interfaces';
import SearchCard from './SearchCard';

const SearchPage = ({ navigation }) => {

  const [gameKeyword, setGameKeyword] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchGames, setSearchGames] = useState<SearchGame[]>([]);

  const fetchGames = async () => {
    try {
      setLoadingSearch(true);
      const response = await fetch(`${apiURL}/games?key=${apiKey}&search=${gameKeyword}&search_exact=true&ordering=-rating`);
      if (!response.ok) throw new Error("Issue fetching game(s) data!")
      const gamesData = await response.json();
      let formattedData: SearchGame[] = [];

      if (gamesData.results) {
        formattedData = formatFetchData(gamesData);
      }

      setSearchGames(formattedData);
      setLoadingSearch(false);
      setGameKeyword("");
    } catch (err) {
      console.error(err);
    }
  }

  //received json is complicated so it is formatted here for ease of use later
  const formatFetchData = (gamesData): SearchGame[] => {

    const formattedData: SearchGame[] = [];

    gamesData.results.forEach(game => {
      const parentPlatform: string = game.parent_platforms[0].platform.name || "";
      const genres: string = game.genres.map(genre => genre.name).join(", ") || "";

      const formattedGame: SearchGame = {
        gameId: game.id,
        name: game.name,
        released: game.released,
        backgroundImage: game.background_image,
        parentPlatform: parentPlatform,
        genres: genres
      }

      formattedData.push(formattedGame);
    })

    return formattedData;
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
          loadingSearch ?
            <Text style={searchPageStyles.text}>Loading...</Text> :
            <FlatList
              data={searchGames}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({ item }) => {
                return (
                  <SearchCard game={item} navigation={navigation} />
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