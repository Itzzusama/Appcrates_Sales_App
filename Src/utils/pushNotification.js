// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Notification from '../Screens/Notification';
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// async function GetFCMToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmtoken');
// }
// if (!fcmToken) {
//   try {
//     const fcmtoken = await messaging().getToken();
//     if (fcmtoken) {
//       console.log(fcmtoken, 'new token');
//       await AsyncStorage.setItem('fcmtoken', fcmtoken);
//     }
//   } catch (error) {
//     console.log('error', 'error in fcmtoken');
//   }
// }
// const NotificationListner = () => {
//   // Assume a message-notification contains a "type" property in the data payload of the screen to open

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     navigation.navigate(remoteMessage.data.type);
//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//     messaging().onMessage(async remoteMessage=>{
//         console.log("notification ",remoteMessage);
//     })
// };
