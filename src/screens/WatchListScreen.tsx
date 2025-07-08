import Avatar from '@components/common/Avatar';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

type Movie = {
  id: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  description: string;
};

const mockWatchList: Movie[] = [
  {
    id: '1',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
    name: 'Wonder Woman 1984',
    releaseDate: '2020-12-16',
    description:
      'Diana Prince comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe in the form of the Cheetah.',
  },
  {
    id: '2',
    imageUrl: 'https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
    name: 'Soul',
    releaseDate: '2020-12-25',
    description:
      'A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself.',
  },
  {
    id: '3',
    imageUrl: 'https://image.tmdb.org/t/p/w500/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg',
    name: 'Tenet',
    releaseDate: '2020-08-22',
    description:
      'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage.',
  },
  {
    id: '4',
    imageUrl: 'https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
    name: "The Queen's Gambit",
    releaseDate: '2020-10-23',
    description:
      'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.',
  },
];

const WatchListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar name={'John Doe'} size={64} />
        <View style={{ marginLeft: 26 }}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.memberSince}>Member since August 2023</Text>
        </View>
      </View>

      <FlatList
        style={{ width: '100%' }}
        data={mockWatchList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              backgroundColor: '#f9f9f9',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 80,
                height: 120,
                borderRadius: 6,
                marginRight: 12,
              }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.name}
              </Text>
              <Text style={{ color: '#666', marginBottom: 5 }}>
                {item.releaseDate}
              </Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Your watch list is empty.
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    backgroundColor: '#042541',
    paddingVertical: 40,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  memberSince: {
    color: '#FFFFFFB2',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 4,
  },
});

export default WatchListScreen;
