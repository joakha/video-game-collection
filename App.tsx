import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from './components/search-page/SearchPage';
import CollectionPage from './components/collection-page/CollectionPage';
import StatisticsPage from './components/statistics-page/StatisticsPage';
import DetailsPage from './components/search-page/DetailsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Search Page" options={{ headerShown: false}} component={SearchPage} />
      <AppStack.Screen name="Game Details" component={DetailsPage} />
    </AppStack.Navigator>
  )
}

const AppTabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppTabs.Navigator>
        <AppTabs.Screen name="Search" options={{ headerShown: false}} component={AppStackNavigator} />
        <AppTabs.Screen name="Collection" options={{ headerShown: false}} component={CollectionPage} />
        <AppTabs.Screen name="Statistics" options={{ headerShown: false}} component={StatisticsPage} />
      </AppTabs.Navigator>
    </NavigationContainer>
  );
}

export default App