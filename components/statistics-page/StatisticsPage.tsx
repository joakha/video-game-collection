import { Text, View } from 'react-native';
import { statisticsStyles } from '../../styles/StatisticsPageStyles';

const StatisticsPage = () => {
  return (
    <View style={statisticsStyles.container}>
      <Text>This is the statistics tab!</Text>
    </View>
  );
}

export default StatisticsPage