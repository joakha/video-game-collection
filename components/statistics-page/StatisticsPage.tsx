import { statisticsStyles } from '../../styles/StatisticsPageStyles';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import { PieData } from '../../interfaces/interfaces';
import useGame from '../../hooks/useGame';

const StatisticsPage = () => {

  const { loadingMyGames, myGames } = useGame();

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