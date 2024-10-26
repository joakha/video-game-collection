import { Text, View } from 'react-native';
import { statisticsStyles } from '../../styles/AppStyles';

const StatisticsPage = () => {
  return (
    <View style={statisticsStyles.container}>
      <Text>This is the statistics tab!</Text>
    </View>
  );
}

export default StatisticsPage