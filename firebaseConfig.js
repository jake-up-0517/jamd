import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA2vRu9ZaEa84wuqh4DQZjV-j8m7U6lWyc',
  authDomain: 'jamd-bc2d5.firebaseapp.com',
  projectId: 'jamd-bc2d5',
  storageBucket: 'jamd-bc2d5.appspot.com',
  messagingSenderId: '800505273117',
  appId: '1:800505273117:web:c00733f09e9c41d6b91ff4',
  measurementId: 'G-HHTXZ50E5E',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
