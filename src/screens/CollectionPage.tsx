import { View, FlatList, ActivityIndicator } from 'react-native';
import { collectionPageStyles, collectionFilterPickerStyles, collectionSortPickerStyles } from '../styles/CollectionPageStyles';
import CollectionCard from '../components//collection-page/CollectionCard';
import { useState, useEffect } from 'react';
import { CollectionGame, CollectionPageProps, FilterOptions } from '../types/types';
import { Picker } from '@react-native-picker/picker';
import { ListEmptyComponent } from '../constants/constants';
import { Portal, Searchbar } from 'react-native-paper';
import useGame from '../hooks/useGame';
import { searchbarStyles } from '../styles/SharedStyles';

const CollectionPage = ({ navigation }: CollectionPageProps) => {

  const { loadingGames, firebaseGamesWithKeys } = useGame();

  const [sortedFilteredGames, setSortedFilteredGames] = useState<CollectionGame[]>([]);
  const [sortOption, setSortOption] = useState<string>("A-Z");
  const [filterOption, setFilterOption] = useState<string>("All");
  const [keyword, setKeyword] = useState<string>("");

  const sortOptions = ["A-Z", "Z-A", "Latest", "Oldest"];
  const filterOptions: FilterOptions = {
    cyan: "Favorites",
    black: "All",
    green: "Playing",
    blue: "Completed",
    orange: "Paused",
    red: "Dropped",
    grey: "Planned",
  };

  const updateCollection = () => {

    let gameCollection = [...firebaseGamesWithKeys];

    if (keyword.trim() !== "") gameCollection = gameCollection.filter(game => game.name.toLowerCase().includes(keyword.toLowerCase()));
    if (filterOption !== "All" && filterOption !== "Favorites") gameCollection = gameCollection.filter(game => game.status === filterOption);
    if (filterOption === "Favorites") gameCollection = gameCollection.filter(game => game.isFavorite === true);

    switch (sortOption) {
      case "A-Z":
        gameCollection.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        gameCollection.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Latest":
        gameCollection.sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return bDate.getTime() - aDate.getTime();
        });
        break;
      case "Oldest":
        gameCollection.sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return aDate.getTime() - bDate.getTime();
        });
        break;
    }

    setSortedFilteredGames(gameCollection);
  }

  useEffect(() => {
    if (firebaseGamesWithKeys.length > 0) {
      updateCollection();
    } else {
      setFilterOption("All");
      setSortOption("A-Z");
      setSortedFilteredGames([]);
    }
  }, [firebaseGamesWithKeys, filterOption, sortOption, keyword])

  return (
    <Portal.Host>
      <View style={collectionPageStyles.body}>

        <View style={collectionPageStyles.flatlistView}>
          {
            loadingGames ? (
              <ActivityIndicator size='large' />
            ) : (
              <FlatList
                data={sortedFilteredGames}
                keyExtractor={(item) => item.firebaseId}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({ item }) => {
                  return <CollectionCard game={item} navigation={navigation} />
                }}
              />
            )
          }
        </View>

        <View>
          <View style={collectionPageStyles.inputView}>
            <Picker
              style={collectionFilterPickerStyles}
              selectedValue={filterOption}
              onValueChange={(itemValue) => setFilterOption(itemValue)}
            >
              {
                Object.keys(filterOptions).map((option, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      color={option}
                      label={filterOptions[option as keyof FilterOptions]}
                      value={filterOptions[option as keyof FilterOptions]}
                    />
                  )
                })
              }
            </Picker>

            <Picker
              style={collectionSortPickerStyles}
              selectedValue={sortOption}
              onValueChange={(itemValue) => setSortOption(itemValue)}
            >
              {
                sortOptions.map((option, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={option}
                      value={option}
                    />
                  )
                })
              }
            </Picker>
          </View>

          <View style={collectionPageStyles.inputView}>
            <Searchbar
              placeholder="Type a game title"
              onChangeText={setKeyword}
              value={keyword}
              style={searchbarStyles.style}
              inputStyle={searchbarStyles.inputStyle}
              placeholderTextColor={searchbarStyles.placeholderTextColor}
              selectionColor={searchbarStyles.selectionColor}
              iconColor={searchbarStyles.iconColor}
              icon={searchbarStyles.icon}
            />
          </View>
        </View>

      </View >
    </Portal.Host>
  );
}

export default CollectionPage