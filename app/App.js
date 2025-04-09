import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import DoctorSearchScreen from './screens/DoctorSearchScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import MedicationTrackerScreen from './screens/MedicationTrackerScreen';
import MedicalHistoryScreen from './screens/MedicalHistoryScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Doctors') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        initialParams={{ setIsLoggedIn }}
      />
      <Tab.Screen 
        name="Doctors" 
        component={DoctorSearchScreen}
      />
      <Tab.Screen 
        name="Medications" 
        component={MedicationTrackerScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        initialParams={{ setIsLoggedIn }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        initialParams={{ setIsLoggedIn }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading resources (if you need to load anything asynchronously)
        await new Promise(resolve => setTimeout(resolve, 2000));  // Simulating load time
        setAppReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen 
              name="MainApp" 
              component={MainTabs}
              initialParams={{ setIsLoggedIn }}
            />
            <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
            <Stack.Screen name="Appointment" component={AppointmentScreen} />
            <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              initialParams={{ setIsLoggedIn }}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
