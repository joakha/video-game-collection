import { View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { searchPageStyles, searchButtonProps } from '../../styles/SearchPageStyles';
import { useState } from 'react';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { apiURL, apiKey } from '../../constants/constants';
import { SearchGame, SearchPageProps } from '../../types/types';
import SearchCard from './SearchCard';
import { ListEmptyComponent } from '../../constants/constants';
import { searchbarStyles, buttonStyles } from '../../styles/SharedStyles';

const SearchPage = ({ navigation }: SearchPageProps) => {

  const [gameKeyword, setGameKeyword] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchGames, setSearchGames] = useState<SearchGame[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("");

  const defaultSearchString: string = `${apiURL}/games?key=${apiKey}&search=${gameKeyword}&search_exact=true&ordering=-rating`;

  const fetchTrendingGames = async () => {
    //period for trending games will be the last month
    //current date
    const currentDate = new Date();
    //formatted string for current date
    const currentDateString = currentDate.toISOString().split("T")[0];
    //date a month ago
    const currentDateMonthAgo = new Date();
    currentDateMonthAgo.setMonth(currentDate.getMonth() - 1);
    //formatted string for date a month ago
    const previousMonthString = currentDateMonthAgo.toISOString().split("T")[0];

    try {
      setLoadingSearch(true);
      const response = await fetch(`https://api.rawg.io/api/games?dates=${previousMonthString},${currentDateString}&ordering=-added&key=${apiKey}`);
      if (!response.ok) throw new Error("Issue fetching game(s) data!")

      const gamesData = await response.json();
      let formattedData: SearchGame[] = [];

      if (gamesData.results) {
        formattedData = formatFetchData(gamesData);
      }

      setSearchGames(formattedData);
      setNextPage(gamesData.next);
      setPreviousPage(gamesData.previous);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  const fetchGamesWithKeyword = async (searchString: string) => {
    try {
      setLoadingSearch(true);
      const response = await fetch(searchString);
      if (!response.ok) throw new Error("Issue fetching game(s) data!")

      const gamesData = await response.json();
      let formattedData: SearchGame[] = [];

      if (gamesData.results) {
        formattedData = formatFetchData(gamesData);
      }

      setSearchGames(formattedData);
      setNextPage(gamesData.next);
      setPreviousPage(gamesData.previous);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  //received json is complicated so it is formatted here for ease of use later
  const formatFetchData = (gamesData: any): SearchGame[] => {

    const formattedData: SearchGame[] = [];

    gamesData.results.forEach((game: any) => {
      const parentPlatform: string = game.parent_platforms?.[0]?.platform?.name || "";
      const genres: string = game.genres?.map((genre: any) => genre.name).join(", ") || "";

      const formattedGame: SearchGame = {
        gameId: game.id,
        name: game.name || "",
        released: game.released || "",
        backgroundImage: game.background_image || "",
        parentPlatform: parentPlatform,
        genres: genres
      }

      formattedData.push(formattedGame);
    })

    return formattedData;
  }

  return (
    <View style={searchPageStyles.body}>

      <View style={searchPageStyles.flatlistView}>
        {
          loadingSearch ? (
            <ActivityIndicator size='large' />
          ) : (
            <FlatList
              data={searchGames}
              ListEmptyComponent={ListEmptyComponent}
              numColumns={2}
              renderItem={({ item }) => {
                return <SearchCard game={item} navigation={navigation} />
              }}
            />
          )
        }
      </View>

      <View style={searchPageStyles.inputView}>

        <View style={searchPageStyles.paginationView}>
          {
            //render button for pagination or render empty placeholder view so that possibly existing pagination button maintains correct placement
            previousPage ? (
              <IconButton
                icon="arrow-left"
                iconColor={buttonStyles.iconColor}
                containerColor={buttonStyles.containerColor}
                onPress={() => loadingSearch === false && fetchGamesWithKeyword(previousPage)}
                style={searchPageStyles.paginationButton}
              />
            ) : (
              <View style={searchPageStyles.placeHolderView} />
            )
          }
          <Button
            textColor={searchButtonProps.textColor}
            buttonColor={searchButtonProps.buttonColor}
            style={searchPageStyles.searchButton}
            onPress={() => loadingSearch === false && fetchTrendingGames()}
          >
            Trending
          </Button>
          <Button
            textColor={searchButtonProps.textColor}
            buttonColor={searchButtonProps.buttonColor}
            style={searchPageStyles.searchButton}
          >
            Upcoming
          </Button>
          {
            //render button for pagination or render empty placeholder view so that possibly existing pagination button maintains correct placement
            nextPage ? (
              <IconButton
                icon="arrow-right"
                iconColor={buttonStyles.iconColor}
                containerColor={buttonStyles.containerColor}
                onPress={() => loadingSearch === false && fetchGamesWithKeyword(nextPage)}
                style={searchPageStyles.paginationButton}
              />
            ) : (
              <View style={searchPageStyles.placeHolderView} />
            )
          }
        </View>

        <View style={searchPageStyles.searchView}>
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
          <IconButton
            size={buttonStyles.size}
            icon="search-web"
            iconColor={buttonStyles.iconColor}
            containerColor={buttonStyles.containerColor}
            onPress={() => loadingSearch === false && fetchGamesWithKeyword(defaultSearchString)}
          />
        </View>

      </View>

    </View >
  );
}

export default SearchPage