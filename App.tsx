import { NavigationContainer } from '@react-navigation/native';
import { store } from '@redux/store';
import { Provider } from 'react-redux';

import RootStack from './src/Navigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
