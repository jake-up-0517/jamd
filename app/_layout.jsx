import { Stack } from 'expo-router/stack';

export default function Root() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

// export const unstable_settings = {
//   initialRouteName: 'index',
// };
