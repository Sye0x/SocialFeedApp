import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from './constants/colorscheme';

import Login from './screens/LoginScreen';
import Register from './screens/SignUpScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';

//redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          height: 68,
          borderRadius: 20,
          backgroundColor: COLORS.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'circle';

          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user-o';
          }

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 42,
                height: 28,
              }}
            >
              <Icon name={iconName} size={20} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="HomeTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.splashText}>Checking session...</Text>
    </View>
  );
}

export default function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (currentUser: FirebaseAuthTypes.User | null) => {
        setUser(currentUser);

        if (initializing) {
          setInitializing(false);
        }
      },
    );

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <SplashScreen />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
