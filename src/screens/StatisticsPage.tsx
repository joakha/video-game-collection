import { statisticsStyles } from '../styles/StatisticsPageStyles';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useGame from '../hooks/useGame';
import GenrePieChart from '../components/statistics-page/GenrePieChart';
import StatusPieChart from '../components/statistics-page/StatusPieChart';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatisticsPage = () => {

  const { loadingGames, firebaseGamesWithKeys } = useGame();

  const totalGames = firebaseGamesWithKeys.length;
  const averageReviewScore = firebaseGamesWithKeys.reduce((prev, curr) => {
    return prev + Number(curr.reviewScore)
  }, 0) / firebaseGamesWithKeys.length;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={statisticsStyles.scrollView}>
        <View style={statisticsStyles.body}>
          {
            loadingGames ? (
              <ActivityIndicator size='large' />
            ) : firebaseGamesWithKeys.length === 0 ? (
              <Text style={statisticsStyles.headerText}>No Games in Collection!</Text>
            ) : (
              <>
                <View>
                  <Text style={statisticsStyles.headerText}>Total Number of Games in Collection: <Text style={statisticsStyles.infoText}>{totalGames}</Text></Text>
                  <Text style={statisticsStyles.headerText}>Your Average Review Score: <Text style={statisticsStyles.infoText}>{averageReviewScore}</Text></Text>
                  <Text style={statisticsStyles.headerText}>Games by Status</Text>
                  <StatusPieChart />
                </View>
                <View>
                  <Text style={statisticsStyles.headerText}>Games by Main Genre</Text>
                  <GenrePieChart />
                </View>
              </>
            )
          }
        </View >
      </ScrollView >
    </SafeAreaView>
  );
}

export default StatisticsPage