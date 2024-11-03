import { Text, View, FlatList } from 'react-native';
import { collectionPageStyles, collectionButtonStyles } from '../../styles/CollectionPageStyles';
import { Button } from 'react-native-paper';
import CollectionCard from './CollectionCard';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { GameCardEntity, CollectionCardEntity } from '../../interfaces/interfaces';
import { firebaseApp } from '../../firebase/firebaseConfig';

const CollectionPage = ({ navigation }) => {

  const database = getDatabase(firebaseApp);

  const [myGames, setMyGames] = useState<CollectionCardEntity[]>([]);
  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false)

  useEffect(() => {
    const gamesRef = ref(database, 'myGames/');

    onValue(gamesRef, (snapshot) => {
      setLoadingMyGames(true);
      const dbData = snapshot.val();

      if (dbData) {
        const dataKeys = Object.keys(dbData);
        const gamesData: GameCardEntity[] = Object.values(dbData);

        const gamesDataWithkeys: CollectionCardEntity[] = gamesData.map((game, index) => {
          const gameWithKey = { ...game, firebaseId: dataKeys[index] }
          return gameWithKey;
        })

        setMyGames(gamesDataWithkeys);

      } else {
        setMyGames([]); //if no games are found, state will be empty
      }

      setLoadingMyGames(false);
    })
  }, []);

  const sortGames = () => {
    console.log("hello!");
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
              data={myGames}
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
        <Button
          icon={collectionButtonStyles.icon}
          buttonColor={collectionButtonStyles.buttonColor}
          style={collectionButtonStyles.style}
          textColor={collectionButtonStyles.textColor}
          onPress={sortGames}
        >
          Sort games
        </Button>
      </View>

    </View>
  );
}

export default CollectionPage