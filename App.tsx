import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Navigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
