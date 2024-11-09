import { Text, View, FlatList } from 'react-native';
import { collectionPageStyles, collectionPickerStyles } from '../../styles/CollectionPageStyles';
import CollectionCard from './CollectionCard';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { MyGame, CollectionGame } from '../../interfaces/interfaces';
import { database } from '../../firebase/firebaseConfig';
import { Picker } from '@react-native-picker/picker';

const CollectionPage = ({ navigation }) => {

  const [myGames, setMyGames] = useState<CollectionGame[]>([]);
  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false);
  const [sortedFilteredGames, setSortedFilteredGames] = useState<CollectionGame[]>([]);
  const [sortOption, setSortOption] = useState<string>("Latest");

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

        setMyGames(gamesDataWithkeys);
      } else {
        setMyGames([]);
      }

      setLoadingMyGames(false);
    })
  }, []);

  useEffect(() => {
    if (myGames) {
      setSortedFilteredGames(myGames.slice().sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setSortedFilteredGames([]);
    }
  }, [myGames])

  const sortOptions = ["A-Z", "Z-A", "Latest", "Oldest"];

  const sortGames = (option: string) => {
    setSortOption(option);

    switch (option) {
      case "A-Z":
        setSortedFilteredGames(myGames.slice().sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "Z-A":
        setSortedFilteredGames(myGames.slice().sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "Latest":
        setSortedFilteredGames(myGames.slice().sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return bDate.getTime() - aDate.getTime();
        }));
        break;
      case "Oldest":
        setSortedFilteredGames(myGames.slice().sort((a, b) => {
          const aDate = a.released ? new Date(a.released) : new Date(0);
          const bDate = b.released ? new Date(b.released) : new Date(0);

          return aDate.getTime() - bDate.getTime();
        }));
        break;
    }
  }

  const ListEmptyComponent = () => {
    return (
      <Text style={collectionPageStyles.text}>
        No games to show... Yet!
      </Text>
    )
  }

  return (
    <View style={collectionPageStyles.body}>

      <View style={collectionPageStyles.flatlistView}>
        {
          loadingMyGames ?
            <Text style={collectionPageStyles.text}>Loading...</Text> :
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
          style={collectionPickerStyles}
          mode='dropdown'
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