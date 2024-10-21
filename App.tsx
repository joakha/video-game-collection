import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './components/Search';
import Collection from './components/Collection';
import Statistics from './components/Statistics';

const appTabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <appTabs.Navigator>
        <appTabs.Screen name="Search" component={Search} />
        <appTabs.Screen name="Collection" component={Collection} />
        <appTabs.Screen name="Statistics" component={Statistics} />
      </appTabs.Navigator>
    </NavigationContainer>
  );
}

export default App