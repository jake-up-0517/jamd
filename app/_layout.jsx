import { Stack } from 'expo-router/stack';
import { UserProvider } from '../context/UserContext';

export default function Root() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}

// export const unstable_settings = {
//   initialRouteName: 'index',
// };
