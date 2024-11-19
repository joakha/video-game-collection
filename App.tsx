import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from './components/search-page/SearchPage';
import CollectionPage from './components/collection-page/CollectionPage';
import StatisticsPage from './components/statistics-page/StatisticsPage';
import DetailsPage from './components/shared/DetailsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameProvider from './context/GameProvider';

const App = () => {

  const AppStack = createNativeStackNavigator();

  const SearchStackNavigator = () => {
    return (
      <AppStack.Navigator>
        <AppStack.Screen name="Search Page" options={{ headerShown: false }} component={SearchPage} />
        <AppStack.Screen name="Game Details" component={DetailsPage} />
      </AppStack.Navigator>
    )
  }

  const CollectionStackNavigator = () => {
    return (
      <AppStack.Navigator>
        <AppStack.Screen name="Collection Page" options={{ headerShown: false }} component={CollectionPage} />
        <AppStack.Screen name="Game Details" component={DetailsPage} />
      </AppStack.Navigator>
    )
  }

  const AppTabs = createBottomTabNavigator();

  return (
    <GameProvider>
      <NavigationContainer>
        <AppTabs.Navigator>
          <AppTabs.Screen name="Search" options={{ headerShown: false }} component={SearchStackNavigator} />
          <AppTabs.Screen name="Collection" options={{ headerShown: false }} component={CollectionStackNavigator} />
          <AppTabs.Screen name="Statistics" options={{ headerShown: false }} component={StatisticsPage} />
        </AppTabs.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App