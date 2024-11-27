import { statisticsStyles } from '../../styles/StatisticsPageStyles';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useGame from '../../hooks/useGame';
import GenrePieChart from './GenrePieChart';
import StatusPieChart from './StatusPieChart';

const StatisticsPage = () => {

  const { loadingGames, firebaseGamesWithKeys } = useGame();

  return (
    <ScrollView contentContainerStyle={statisticsStyles.contentBody}>
      <View>
        {
          loadingGames ? (
            <ActivityIndicator size='large' />
          ) : firebaseGamesWithKeys.length === 0 ? (
            <Text style={statisticsStyles.headerText}>No Games in Collection!</Text>
          ) : (
            <>
              <View>
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
  );
}

export default StatisticsPage