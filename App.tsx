import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from './components/main-pages/SearchPage';
import CollectionPage from './components/main-pages/CollectionPage';
import StatisticsPage from './components/main-pages/StatisticsPage';

const App = () => {

  const appTabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <appTabs.Navigator>
        <appTabs.Screen name="Search" component={SearchPage} />
        <appTabs.Screen name="Collection" component={CollectionPage} />
        <appTabs.Screen name="Statistics" component={StatisticsPage} />
      </appTabs.Navigator>
    </NavigationContainer>
  );
}

export default App