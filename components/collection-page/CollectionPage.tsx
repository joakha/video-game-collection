import { View, FlatList, ActivityIndicator } from 'react-native';
import { collectionPageStyles, collectionFilterPickerStyles, collectionSortPickerStyles } from '../../styles/CollectionPageStyles';
import CollectionCard from './CollectionCard';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { MyGame, CollectionGame } from '../../interfaces/interfaces';
import { database } from '../../firebase/firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { ListEmptyComponent } from '../../constants/constants';

const CollectionPage = ({ navigation }) => {

  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false);
  const [myGames, setMyGames] = useState<CollectionGame[]>([]);
  const [sortedFilteredGames, setSortedFilteredGames] = useState<CollectionGame[]>([]);
  const [sortOption, setSortOption] = useState<string>("A-Z");
  const [filterOption, setFilterOption] = useState<string>("All");

  const sortOptions = ["A-Z", "Z-A", "Latest", "Oldest"];
  const filterOptions = {
    black: "All",
    green: "Playing",
    blue: "Completed",
    orange: "Paused",
    red: "Dropped",
    grey: "Planned"
  };

  useEffect(() => {
    const gamesRef = ref(database, 'myGames/');

    onValue(gamesRef, (snapshot) => {
      setLoadingMyGames(true);
      const dbData = snapshot.val();

      if (dbData) {
        const dataKeys = Object.keys(dbData);
        const gamesData: MyGame[] = Object.values(dbData);

        const gamesDataWithkeys: CollectionGame[] = gamesData.map((game, index) => {
          const gameWithKey = { ...game, firebaseId: dataKeys[index] }
          return gameWithKey;
        })

        setMyGames(gamesDataWithkeys.sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setMyGames([]);
      }

      setLoadingMyGames(false);
    })
  }, []);

  useEffect(() => {
    setFilterOption("All");
    setSortOption("A-Z");

    if (myGames) {
      setSortedFilteredGames([...myGames]);
    } else {
      setSortedFilteredGames([]);
    }
  }, [myGames])

  const filterGames = (option: string) => {
    setFilterOption(option);
    setSortOption("A-Z");

    switch (option) {
      case "All":
        setSortedFilteredGames([...myGames]);
        break;
      case "Playing":
        setSortedFilteredGames([...myGames].filter(game => game.status === "Playing"));
        break;
      case "Completed":
        setSortedFilteredGames([...myGames].filter(game => game.status === "Completed"));
        break;
      case "Paused":
        setSortedFilteredGames([...myGames].filter(game => game.status === "Paused"));
        break;
      case "Dropped":
        setSortedFilteredGames([...myGames].filter(game => game.status === "Dropped"));
        break;
      case "Planned":
        setSortedFilteredGames([...myGames].filter(game => game.status === "Planned"));
        break;
    }
  }

  const sortGames = (option: string) => {
    setSortOption(option);

    switch (option) {
      case "A-Z":
        setSortedFilteredGames(sortedFilteredGames.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "Z-A":
        setSortedFilteredGames(sortedFilteredGames.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "Latest":
        setSortedFilteredGames(sortedFilteredGames.sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return bDate.getTime() - aDate.getTime();
        }));
        break;
      case "Oldest":
        setSortedFilteredGames(sortedFilteredGames.sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return aDate.getTime() - bDate.getTime();
        }));
        break;
    }
  }

  return (
    <View style={collectionPageStyles.body}>

      <View style={collectionPageStyles.flatlistView}>
        {
          loadingMyGames ?
            <ActivityIndicator size='large' /> :
            <FlatList
              data={sortedFilteredGames}
              keyExtractor={(item) => item.firebaseId}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({ item }) => {
                return (
                  <CollectionCard game={item} navigation={navigation} />
                )
              }}
            />
        }
      </View>

      <View style={collectionPageStyles.inputView}>
        <Picker
          style={collectionFilterPickerStyles}
          selectedValue={filterOption}
          onValueChange={(itemValue) => filterGames(itemValue)}
        >
          {
            Object.keys(filterOptions).map((option, index) => {
              return <Picker.Item key={index} color={option} label={filterOptions[option]} value={filterOptions[option]} />
            })
          }
        </Picker>

        <Picker
          style={collectionSortPickerStyles}
          selectedValue={sortOption}
          onValueChange={(itemValue) => sortGames(itemValue)}
        >
          {
            sortOptions.map((option, index) => {
              return <Picker.Item key={index} label={option} value={option} />
            })
          }
        </Picker>
      </View>

    </View >
  );
}

export default CollectionPage