import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

const MovieDetailScreen: React.FC = () => {
  type RootStackParamList = {
    MovieDetail: { movieId: string };
  };

  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();
  const { movieId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is movie id: {movieId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MovieDetailScreen;
