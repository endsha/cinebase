import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Icons
import HomeIcon from './assets/icons/home.svg';
import WatchListIcon from './assets/icons/watchlist.svg';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import WatchListScreen from './screens/WatchListScreen';
import Header from './components/common/Header';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  console.log('insets', insets);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60 + insets.bottom,
          backgroundColor: '#032541',
        },
        tabBarItemStyle: {
          paddingTop: 12,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <BottomTab.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: () => <WatchListIcon />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          header: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
}
