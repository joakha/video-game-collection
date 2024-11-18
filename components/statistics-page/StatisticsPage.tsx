import { statisticsStyles } from '../../styles/StatisticsPageStyles';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { MyGame, CollectionGame } from '../../interfaces/interfaces';
import { database } from '../../firebase/firebaseConfig';
import { PieChart } from "react-native-gifted-charts";
import { PieData } from '../../interfaces/interfaces';

const StatisticsPage = () => {

  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false);
  const [myGames, setMyGames] = useState<CollectionGame[]>([]);
  const [statusData, setStatusData] = useState<PieData[]>([]);
  const [genreData, setGenreData] = useState<PieData[]>([]);

  const formatStatusData = () => {
    const pieStatusData: PieData[] = [];

    const statuses = [
      { status: "Playing", color: "#77dd77" },
      { status: "Completed", color: "#A7C7E7" },
      { status: "Paused", color: "#FFFAA0" },
      { status: "Dropped", color: "#FAA0A0" },
      { status: "Planned", color: "darkgray" }
    ];

    statuses.forEach((status => {
      const statusCount = myGames.filter(game => game.status === status.status).length;

      if (statusCount > 0) {
        pieStatusData.push(
          {
            value: statusCount,
            color: status.color,
            text: `${statusCount} ${status.status}`
          }
        )
      }
    }))

    return pieStatusData;
  }

  const formatGenreData = () => {
    const pieGenreData: PieData[] = [];
    const genreCounts: any = {};

    myGames.forEach(game => {
      const gameGenre: string = game.genres?.split(",")[0] || "Unknown";

      if (genreCounts[gameGenre]) {
        genreCounts[gameGenre]++
      } else {
        genreCounts[gameGenre] = 1;
      }
    })

    Object.keys(genreCounts).forEach(key => {
      pieGenreData.push(
        {
          value: genreCounts[key],
          text: `${genreCounts[key]} ${key}`
        }
      )
    })

    return pieGenreData;
  }

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
    if (myGames.length > 0) {
      setStatusData(formatStatusData());
      setGenreData(formatGenreData());
    } else {
      setStatusData([]);
      setGenreData([]);
    }
  }, [myGames]);

  return (
    <ScrollView contentContainerStyle={statisticsStyles.contentBody}>
      <View>
        {
          loadingMyGames ? (
            <ActivityIndicator size='large' />
          ) : myGames.length === 0 ? (
            <Text style={statisticsStyles.headerText}>No Games in Collection!</Text>
          ) : (
            <>
              <View>
                <Text style={statisticsStyles.headerText}>Games by Status</Text>
                <PieChart
                  showText
                  textColor="black"
                  radius={150}
                  textSize={13}
                  data={statusData}
                />
              </View>
              <View>
                <Text style={statisticsStyles.headerText}>Games by Main Genre</Text>
                <PieChart
                  showText
                  textColor="black"
                  radius={150}
                  textSize={13}
                  data={genreData}
                />
              </View>
            </>
          )
        }
      </View >
    </ScrollView >
  );
}

export default StatisticsPage