import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArticleScreen } from '../screens/ArticleScreen';
import { HomeScreen } from '../screens/HomeScreen';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ClipScreen } from '../screens/ClipScreen';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clip"
        component={ClipScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const screenOption = ({ route }): BottomTabNavigationOptions => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Clip':
        iconName = 'bookmark';
        break;
    }
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Clip" component={ClipStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
