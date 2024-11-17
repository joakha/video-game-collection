import { statisticsStyles } from '../../styles/StatisticsPageStyles';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { MyGame, CollectionGame } from '../../interfaces/interfaces';
import { database } from '../../firebase/firebaseConfig';
import { PieChart } from "react-native-gifted-charts";
import { StatusData } from '../../interfaces/interfaces';

const StatisticsPage = () => {

  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false);
  const [myGames, setMyGames] = useState<CollectionGame[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);

  const formatStatusData = (gameData: CollectionGame[]) => {
    const statusPieData: StatusData[] = [];

    const statuses = [
      { status: "Playing", color: "#77dd77" },
      { status: "Completed", color: "blue" },
      { status: "Paused", color: "yellow" },
      { status: "Dropped", color: "red" },
      { status: "Planned", color: "gray" }
    ];

    statuses.forEach((status => {
      const statusCount = gameData.filter(game => game.status === status.status).length;

      if (statusCount > 0) {
        statusPieData.push(
          {
            value: statusCount,
            color: status.color,
            text: `${statusCount} ${status.status}`
          }
        )
      }
    }))

    return statusPieData
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
      setStatusData(formatStatusData(myGames));
    } else {
      setStatusData([]);
    }
  }, [myGames]);

  return (
    <ScrollView contentContainerStyle={statisticsStyles.body}>
      <View style={statisticsStyles.chartsView}>
        {
          loadingMyGames ? (
            <ActivityIndicator size='large' />
          ) : myGames.length === 0 ? (
            <Text style={statisticsStyles.headerText}>No Games in Collection!</Text>
          ) : (
            <>
              <Text style={statisticsStyles.headerText}>Games by Status</Text>
              <PieChart
                showText
                textColor="black"
                radius={150}
                textSize={13}
                data={statusData}
              />
            </>
          )
        }
      </View >
    </ScrollView >
  );
}

export default StatisticsPage