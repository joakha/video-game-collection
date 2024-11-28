import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from './src/screens/SearchPage';
import CollectionPage from './src/screens/CollectionPage';
import StatisticsPage from './src/screens/StatisticsPage';
import DetailsPage from './src/screens/DetailsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameProvider from './src/context/GameProvider';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        <AppTabs.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: 'black',
              tabBarIcon: ({ focused, color, size }) => { 

                let iconName: any;
                let iconColor = focused ? '#77dd77' : 'gray';

                if (route.name === 'Search') {
                  iconName = 'search';
                } else if (route.name === 'Collection') {
                  iconName = 'albums';
                } else {
                  iconName = "stats-chart"
                }
    
                return <Ionicons name={iconName} size={size} color={iconColor} />;
              },
            })}>
          <AppTabs.Screen name="Search" options={{ headerShown: false }} component={SearchStackNavigator} />
          <AppTabs.Screen name="Collection" options={{ headerShown: false }} component={CollectionStackNavigator} />
          <AppTabs.Screen name="Statistics" options={{ headerShown: false }} component={StatisticsPage} />
        </AppTabs.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App