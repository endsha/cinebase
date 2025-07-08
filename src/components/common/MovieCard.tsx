import { RootStackParamList } from '@custom-types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Image from '@components/common/Image';

type MovieCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  description: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  imageUrl,
  name,
  releaseDate,
  description,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MovieDetail', { movieId: id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.releaseDate}>{releaseDate}</Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Android shadow
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  releaseDate: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});

export default MovieCard;
