// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as SplashScreen from 'expo-splash-screen';

// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import HomeScreen from './screens/HomeScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAppReady, setAppReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       // Keep the splash screen visible while we load app data
//       await SplashScreen.preventAutoHideAsync();

//       // Simulate loading resources (if you need to load anything asynchronously)
//       setTimeout(() => setAppReady(true), 2000);  // Simulating load time

//       // Hide splash screen after app is ready
//       await SplashScreen.hideAsync();
//     }

//     prepare();
//   }, []);

//   if (!isAppReady) {
//     return null;  // Return null while app is loading (show splash screen)
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isLoggedIn ? (
//           <Stack.Screen name="Home">
//             {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </Stack.Screen>
//         ) : (
//           <>
//             <Stack.Screen name="Login">
//               {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
//             </Stack.Screen>
//             <Stack.Screen name="Signup" component={SignupScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
