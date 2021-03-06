import React, {createContext, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Sign from './registration/sign/Sign';
import RegiMain from './registration/store/RegiMain';
import ManageMain from './management/ManageMain';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import SplashScreen from './registration/sign/SplashScreen';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
const AuthContext = createContext();
const Stack = createNativeStackNavigator();
const BASE_URL = 'http://3.38.99.110:8080/api/partner';

export default function App({navigation}) {
  let firebaseToken;
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log('=-=-=-=-=-=-=- action =-=-=-=-=-=-=-', action);
      switch (action.type) {
        case 'RESTORE_STATE':
          return {
            ...prevState,
            userToken: action.token,
            hasRegistered: action.regi,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            hasRegistered: JSON.parse(action.regi),
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            hasRegistered: false,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: null,
          };
        case 'REGI_SHOP':
          return {
            ...prevState,
            hasRegistered: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      hasRegistered: false,
    },
  );

  // Firebase Alert
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        // ???????????? Alert??? ?????????
        '????????? ??????????????????', // ????????? text: ????????? ??????
        JSON.stringify(remoteMessage['notification'].body),
        [
          {
            text: '????????????',
            onPress: () => {
              updateOrderStatus(remoteMessage['data'].orderId, 'REJECT');
              console.log(remoteMessage['data'].orderId);
              Alert.alert('????????? ??????????????????.');
            },
          },
          {
            text: '????????????', // ?????? ??????
            onPress: () => {
              // TabProgress??? ?????? ????????? ??????
              console.log(remoteMessage['data'].orderId);
              // PaidOrderList ??????
              updateOrderStatus(remoteMessage['data'].orderId, 'PAID');
              Alert.alert('????????? ??????????????????.');
            },
          },
        ],
        {cancelable: false},
      );
    });
    return unsubscribe;
  }, []);

  // ?????? ??????
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(firebaseToken => {
        console.log(firebaseToken);
        return saveTokenToDatabase({firebaseToken});
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh(firebaseToken => {
      saveTokenToDatabase({firebaseToken});
    });
  }, []);
  // const BASE_URL = 'http://10.0.2.2:8080/api/partner'
  const saveTokenToDatabase = async data => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log('====usertoken========' + userToken);
    if (userToken !== null) {
      await axios
        .patch(BASE_URL + '/firebase-token', data, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        })
        .then(res => {
          console.log('success', res.data);
        })
        .catch(error => {
          console.log('fail', error);
        });
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log('====usertoken========' + userToken);
    await axios
      .patch(
        BASE_URL + `/shop/orders/${orderId}/status`,
        {status: status},
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      )
      .then(res => {
        console.log('status ?????? ??????', res.data);
      })
      .catch(error => {
        console.log('status ?????? ??????', error);
      });
  };

  // Restore
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let hasRegistered;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        hasRegistered = JSON.parse(await AsyncStorage.getItem('hasRegistered'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        // ???????????? PaidOrderList??? ?????????????????? ?????????
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }
      // ??????????????? ???????????? ???????????? ??? ??? ?????????
      dispatch({type: 'RESTORE_STATE', token: userToken, regi: hasRegistered});
    };

    bootstrapAsync();
  }, []);

  // useMemo = ????????????????????? ?????? ??????.
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        let userToken;
        let hasRegistered;

        await axios
          .post(BASE_URL + '/login', data)
          .then(function (response) {
            userToken = response.data.token;
            // axios default header ??????
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${userToken}`;
            // AsyncStorage ????????? ??????
            hasRegistered = JSON.stringify(response.data.registerShop);
            AsyncStorage.setItem('userToken', userToken);
            AsyncStorage.setItem('hasRegistered', hasRegistered);
            // ???????????? ?????? ?????? ????????? ?????? PAID ORDER??? ???????????? ??????.
            dispatch({type: 'SIGN_IN', token: userToken, regi: hasRegistered});

            // firebase ?????? ????????????
            console.log('?????? ???????????? ???');
            const firebaseToken = messaging()
              .getToken()
              .then(async firebaseToken => {
                saveTokenToDatabase({firebaseToken});
              });
          })
          .catch(function (error) {
            console.log('????????????;;');
            console.log(error);
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('hasRegistered');
          axios.defaults.headers.common['Authorization'] = undefined;
          dispatch({type: 'SIGN_OUT'});
        } catch {
          console.warn('SIGN OUT FAIL!');
        }
      },
      signUp: async data => {
        await axios
          .post(BASE_URL + '/join', data)
          .then(function (response) {
            console.log('Sign Up!', response.data);
            alert('???????????? ??????');
            dispatch({type: 'SIGN_UP'});
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      registerShop: async data => {
        try {
          const response = await axios.post(BASE_URL + '/shop', data);
          console.log(response.data);
          dispatch({type: 'REGI_SHOP'});
        } catch (e) {
          console.log('whyrano', e);
        }
      },
    }),
    [],
  );

  return (
    // authContext??? value??? ???????????? useContext??? ???????????? ????????? AuthContext??? Children?????? ??????
    // ????????? ?????????????????? Consumer ?????? authContext??? ????????? ????????? ??? ?????? ??????.
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          // ?????? Stack.Navigator??? ????????? Header ?????? ??????
          screenOptions={{
            headerShown: false,
          }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // ?????? ????????? ??????, sign in ?????? ?????? ??????
            <Stack.Screen
              name="Sign"
              component={Sign}
              options={{
                title: 'Sign',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : state.hasRegistered == false ? (
            // ???????????? ????????? ??????????????? ?????? ?????? ??????
            <Stack.Screen name="Home" component={RegiMain} />
          ) : (
            // ???????????? ????????? ??????
            <Stack.Screen name="Main" component={ManageMain} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// AuthContext??? ??????????????? ???????????? ??????
export {AuthContext};
