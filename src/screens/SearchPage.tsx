import { View, FlatList, ActivityIndicator } from 'react-native';
import { searchPageStyles, searchButtonProps } from '../styles/SearchPageStyles';
import { useState } from 'react';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { apiURL, apiKey } from '../constants/constants';
import { SearchGame, SearchPageProps } from '../types/types';
import SearchCard from '../components/search-page/SearchCard';
import { ListEmptyComponent } from '../constants/constants';
import { searchbarStyles, buttonStyles } from '../styles/SharedStyles';
import { fetchUpcomingGamesData, fetchTrendingGamesData, fetchKeywordGames } from '../api/apiCalls';

const SearchPage = ({ navigation }: SearchPageProps) => {

  const [gameKeyword, setGameKeyword] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchGames, setSearchGames] = useState<SearchGame[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("");

  const defaultKeywordSearchString: string = `${apiURL}/games?key=${apiKey}&search=${gameKeyword}&search_exact=true&ordering=-rating`;

  const getTrendingOrUpcomingGames = async (option: string) => {
    try {
      setLoadingSearch(true);
      let searchData = [];

      if (option === "trending") {
        searchData = await fetchTrendingGamesData();
      } else {
        searchData = await fetchUpcomingGamesData();
      }

      let formattedData: SearchGame[] = [];

      if (searchData.results) {
        formattedData = formatSearchData(searchData);
      }

      setSearchGames(formattedData);
      setNextPage(searchData.next);
      setPreviousPage(searchData.previous);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  const getGamesWithKeyword = async (searchString: string) => {
    try {
      setLoadingSearch(true);

      const searchData = await fetchKeywordGames(searchString);

      let formattedData: SearchGame[] = [];

      if (searchData.results) {
        formattedData = formatSearchData(searchData);
      }

      setSearchGames(formattedData);
      setNextPage(searchData.next);
      setPreviousPage(searchData.previous);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  //received json is complicated so it is formatted here for ease of use later
  const formatSearchData = (searchData: any): SearchGame[] => {

    const formattedData: SearchGame[] = [];

    searchData.results.forEach((game: any) => {
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
                  onPress={() => loadingSearch === false && getGamesWithKeyword(previousPage)}
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
              onPress={() => loadingSearch === false && getTrendingOrUpcomingGames("trending")}
            >
              Trending
            </Button>
            <Button
              textColor={searchButtonProps.textColor}
              buttonColor={searchButtonProps.buttonColor}
              style={searchPageStyles.searchButton}
              onPress={() => loadingSearch === false && getTrendingOrUpcomingGames("upcoming")}
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
                  onPress={() => loadingSearch === false && getGamesWithKeyword(nextPage)}
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
              onPress={() => loadingSearch === false && getGamesWithKeyword(defaultKeywordSearchString)}
            />
          </View>

        </View>

      </View >
  );
}

export default SearchPage