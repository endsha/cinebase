import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@custom-types/navigation';
import Dropdown from '@components/common/Dropdown';
import { Category, Movie, SortBy } from '@custom-types/common';
import { FlatList, Image } from 'react-native';
import MovieCard from '@components/common/MovieCard';

const mockData: Movie[] = [
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
      'Armed with only one word—Tenet—and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
  },
  {
    id: '4',
    imageUrl: 'https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
    name: 'The Call',
    releaseDate: '2020-11-27',
    description:
      "Connected by phone in the same house but 20 years apart, a serial killer puts another woman's past—and life—on the line to change her own fate.",
  },
  {
    id: '5',
    imageUrl: 'https://image.tmdb.org/t/p/w500/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
    name: 'Greenland',
    releaseDate: '2020-07-29',
    description:
      'A family struggles for survival in the face of a cataclysmic natural disaster.',
  },
  {
    id: '6',
    imageUrl: 'https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg',
    name: 'Mulan',
    releaseDate: '2020-09-04',
    description:
      'A young Chinese maiden disguises herself as a male warrior in order to save her father.',
  },
  {
    id: '7',
    imageUrl: 'https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
    name: 'Hard Kill',
    releaseDate: '2020-10-23',
    description:
      'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
  },
  {
    id: '8',
    imageUrl: 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg',
    name: 'The Croods: A New Age',
    releaseDate: '2020-11-25',
    description:
      'The prehistoric family the Croods are challenged by a rival family the Bettermans, who claim to be better and more evolved.',
  },
  {
    id: '9',
    imageUrl: 'https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg',
    name: 'The New Mutants',
    releaseDate: '2020-08-26',
    description:
      'Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.',
  },
  {
    id: '10',
    imageUrl: 'https://image.tmdb.org/t/p/w500/4V2nTPfeB59TcqJcUfQ9ziTi7VN.jpg',
    name: 'The Witches',
    releaseDate: '2020-10-26',
    description:
      'A young boy and his grandmother have a run-in with a coven of witches and their leader.',
  },
  {
    id: '11',
    imageUrl: 'https://image.tmdb.org/t/p/w500/6wxfWZxQcuv2QgxIQKj0eYTdKTv.jpg',
    name: 'Jiu Jitsu',
    releaseDate: '2020-11-20',
    description:
      'Every six years, an ancient order of jiu-jitsu fighters joins forces to battle a vicious race of alien invaders.',
  },
  {
    id: '12',
    imageUrl: 'https://image.tmdb.org/t/p/w500/7qRll6dyV0Pp2vJz4l1AL5fMWzM.jpg',
    name: 'The Midnight Sky',
    releaseDate: '2020-12-10',
    description:
      'A lone scientist in the Arctic races to contact a crew of astronauts returning home to a mysterious global catastrophe.',
  },
  {
    id: '13',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8XZI9QZ7Pm3fVkigWJPbrXCMzjq.jpg',
    name: 'Monster Hunter',
    releaseDate: '2020-12-03',
    description:
      'When Lt. Artemis and her loyal soldiers are transported to a new world, they engage in a desperate battle for survival against enormous enemies with incredible powers.',
  },
  {
    id: '14',
    imageUrl: 'https://image.tmdb.org/t/p/w500/5KmhjlR5CEarB8mKtpjcjHRYIu9.jpg',
    name: 'The Outpost',
    releaseDate: '2020-06-24',
    description:
      'A small team of U.S. soldiers battles against hundreds of Taliban fighters in Afghanistan.',
  },
  {
    id: '15',
    imageUrl: 'https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg',
    name: 'The Secret Garden',
    releaseDate: '2020-08-07',
    description:
      "A girl discovers a magical garden hidden at her uncle's house.",
  },
  {
    id: '16',
    imageUrl: 'https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg',
    name: 'The New Mutants',
    releaseDate: '2020-08-26',
    description:
      'Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.',
  },
  {
    id: '17',
    imageUrl: 'https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg',
    name: 'Mulan',
    releaseDate: '2020-09-04',
    description:
      'A young Chinese maiden disguises herself as a male warrior in order to save her father.',
  },
  {
    id: '18',
    imageUrl: 'https://image.tmdb.org/t/p/w500/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
    name: 'Greenland',
    releaseDate: '2020-07-29',
    description:
      'A family struggles for survival in the face of a cataclysmic natural disaster.',
  },
  {
    id: '19',
    imageUrl: 'https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
    name: 'Hard Kill',
    releaseDate: '2020-10-23',
    description:
      'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
  },
  {
    id: '20',
    imageUrl: 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg',
    name: 'The Croods: A New Age',
    releaseDate: '2020-11-25',
    description:
      'The prehistoric family the Croods are challenged by a rival family the Bettermans, who claim to be better and more evolved.',
  },
  {
    id: '21',
    imageUrl: 'https://image.tmdb.org/t/p/w500/4V2nTPfeB59TcqJcUfQ9ziTi7VN.jpg',
    name: 'The Witches',
    releaseDate: '2020-10-26',
    description:
      'A young boy and his grandmother have a run-in with a coven of witches and their leader.',
  },
  {
    id: '22',
    imageUrl: 'https://image.tmdb.org/t/p/w500/6wxfWZxQcuv2QgxIQKj0eYTdKTv.jpg',
    name: 'Jiu Jitsu',
    releaseDate: '2020-11-20',
    description:
      'Every six years, an ancient order of jiu-jitsu fighters joins forces to battle a vicious race of alien invaders.',
  },
  {
    id: '23',
    imageUrl: 'https://image.tmdb.org/t/p/w500/7qRll6dyV0Pp2vJz4l1AL5fMWzM.jpg',
    name: 'The Midnight Sky',
    releaseDate: '2020-12-10',
    description:
      'A lone scientist in the Arctic races to contact a crew of astronauts returning home to a mysterious global catastrophe.',
  },
  {
    id: '24',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8XZI9QZ7Pm3fVkigWJPbrXCMzjq.jpg',
    name: 'Monster Hunter',
    releaseDate: '2020-12-03',
    description:
      'When Lt. Artemis and her loyal soldiers are transported to a new world, they engage in a desperate battle for survival against enormous enemies with incredible powers.',
  },
];

const categories = [
  { label: 'Now Playing', value: Category.NowPlaying },
  { label: 'Upcoming', value: Category.Upcoming },
  { label: 'Popular', value: Category.Popular },
];

const sortBy = [
  { label: 'By Alphabetical Order', value: SortBy.ByAlphabeticalOrder },
  { label: 'By Rating', value: SortBy.ByRating },
  { label: 'By Release Date', value: SortBy.ByReleaseDate },
];

const HomeScreen = () => {
  const handleSearch = () => {
    Alert.alert('Search functionality is not implemented yet.');
  };
  const handleLoadMore = () => {
    Alert.alert('Load more functionality is not implemented yet.');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={styles.container}>
        <Dropdown
          style={{ width: '100%' }}
          value={Category.NowPlaying}
          items={categories}
        />
        <Dropdown
          style={{ width: '100%', marginVertical: 16 }}
          placeholder="Sort By"
          items={sortBy}
        />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#999999"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
          style={{ width: '100%' }}
          data={mockData}
          keyExtractor={item => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item }) => <MovieCard {...item} />}
          contentContainerStyle={{ paddingBottom: 16, width: '100%' }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
            >
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  searchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Android shadow
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E4E4E4',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  searchButtonText: {
    color: '#00000080',
    fontSize: 16,
    fontWeight: '600',
  },
  loadMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#00B4E4',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 85,
  },
  loadMoreButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default HomeScreen;
