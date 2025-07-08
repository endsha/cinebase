import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import LeftArrowIcon from '@assets/icons/left-arrow.svg';
import { RootStackParamList } from '@custom-types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import WatchListIcon from '@assets/icons/watchlist.svg';

type MovieDetail = {
  id: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  shortDescription: string;
  ageRating: string;
  duration: string;
  genres: string[];
  director: string;
  writer: string;
  score: number;
  description: string;
  status: string;
  language: string;
};

const mockData: MovieDetail = {
  id: '1',
  imageUrl: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', // Barbie (2023) poster from TMDB
  name: 'Barbie',
  releaseDate: '2023-07-21',
  shortDescription:
    'Barbie suffers a crisis that leads her to question her world and her existence.',
  ageRating: 'PG13',
  duration: '1h 54m',
  genres: ['Adventure', 'Comedy', 'Fantasy'],
  director: 'Greta Gerwig',
  writer: 'Noah Baumbach',
  score: 7.2,
  description:
    'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
  status: 'Released',
  language: 'English',
};

type CastMember = {
  id: string;
  imageUrl: string;
  name: string;
  role: string;
};

const mockTopBilledCast: CastMember[] = [
  {
    id: '1',
    imageUrl: 'https://image.tmdb.org/t/p/w185/iu3bQpt4HiRrN1wWx2h6GVZIp9U.jpg', // Margot Robbie
    name: 'Margot Robbie',
    role: 'Barbie',
  },
  {
    id: '2',
    imageUrl: 'https://image.tmdb.org/t/p/w185/7k1J9cC0l7KqQkLkR5Q1QMQS8gO.jpg', // Ryan Gosling
    name: 'Ryan Gosling',
    role: 'Ken',
  },
  {
    id: '3',
    imageUrl: 'https://image.tmdb.org/t/p/w185/8QBylBsQf4llkGrWR3qAsOtOU8O.jpg', // America Ferrera
    name: 'America Ferrera',
    role: 'Gloria',
  },
  {
    id: '4',
    imageUrl: 'https://image.tmdb.org/t/p/w185/1YjdSym1jTG7xjHSI0yGGWEsw5i.jpg', // Kate McKinnon
    name: 'Kate McKinnon',
    role: 'Weird Barbie',
  },
  {
    id: '5',
    imageUrl: 'https://image.tmdb.org/t/p/w185/3bOGNsHlrswhyW79uvIHH1V43JI.jpg', // Issa Rae
    name: 'Issa Rae',
    role: 'President Barbie',
  },
];

type Recommendation = {
  id: string;
  name: string;
  imageUrl: string;
  userScorePercent: number;
};

const mockRecommendations: Recommendation[] = [
  {
    id: '2',
    name: 'Oppenheimer',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    userScorePercent: 93,
  },
  {
    id: '3',
    name: 'The Little Mermaid',
    imageUrl: 'https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
    userScorePercent: 67,
  },
  {
    id: '4',
    name: 'Mission: Impossible - Dead Reckoning Part One',
    imageUrl: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    userScorePercent: 81,
  },
  {
    id: '5',
    name: 'Elemental',
    imageUrl: 'https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    userScorePercent: 76,
  },
  {
    id: '6',
    name: 'Spider-Man: Across the Spider-Verse',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    userScorePercent: 95,
  },
];

const MovieDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();
  const { movieId } = route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  console.log('Movie ID:', movieId);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.movieOverview}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.headerText}
          >
            {mockData.name}
          </Text>
        </View>

        <View style={styles.overviewInfo}>
          <Image
            source={{ uri: mockData.imageUrl }}
            style={styles.movieImage}
          />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...styles.overviewText, ...styles.ageRating }}>
                {mockData.ageRating}
              </Text>
            </View>

            <Text style={styles.overviewText}>
              {mockData.releaseDate} • {mockData.duration}
            </Text>
            <Text style={styles.overviewText}>
              {mockData.genres.join(', ')}
            </Text>
            <Text style={styles.overviewText}>
              <Text style={{ fontWeight: '600' }}>Status: </Text>
              {mockData.status}
            </Text>
            <Text style={styles.overviewText}>
              <Text style={{ fontWeight: '600' }}>Original Language: </Text>
              {mockData.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.movieDetail}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#042541',
                borderRadius: 30,
              }}
            />
            <Text style={styles.userScoreTitle}>User Score</Text>
          </View>

          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.authorName}>{mockData.director}</Text>
              <Text style={styles.authorRole}>Director, Writer</Text>
            </View>
            <View style={{ height: 15 }} />
            <View>
              <Text style={styles.authorName}>{mockData.writer}</Text>
              <Text style={styles.authorRole}>Writer</Text>
            </View>
          </View>
        </View>
        <Text style={styles.shortDescription}>{mockData.shortDescription}</Text>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.descriptionText}>{mockData.description}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 30 }}>
        <TouchableOpacity style={styles.addWatchlistButton}>
          <WatchListIcon />
          <Text style={styles.addWatchlistButtonText}>Add To Watchlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otherInfo}>
        <View>
          <Text style={styles.topBillCastTitle}>Top Billed Cast</Text>
          <FlatList
            data={mockTopBilledCast}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 20 }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 100, height: 150, borderRadius: 5 }}
                />
                <Text
                  style={{ color: '#000', fontWeight: '600', marginTop: 8 }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: '#000', fontSize: 14 }}>{item.role}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          <FlatList
            data={mockRecommendations}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 20 }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 100, height: 150, borderRadius: 5 }}
                />
                <Text
                  style={{ color: '#000', fontWeight: '600', marginTop: 8 }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: '#000', fontSize: 14 }}>
                  User Score: {item.userScorePercent}%
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#00B4E4',
  },
  movieOverview: {
    width: '100%',
    backgroundColor: '#00000026',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    maxWidth: '80%',
  },
  backButton: {
    position: 'absolute',
    left: 12,
  },
  overviewInfo: {
    paddingTop: 18,
    paddingBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  ageRating: {
    marginTop: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#FFFFFFB2',
    color: '#FFFFFFB2',
  },
  overviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
    borderRadius: 4,
  },
  movieImage: {
    width: 112,
    height: 145,
    borderRadius: 5,
    marginRight: 22,
  },
  movieDetail: {
    width: '100%',
    paddingVertical: 35,
    paddingLeft: 30,
    paddingRight: 20,
  },
  userScoreTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  authorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authorRole: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  shortDescription: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'italic',
    marginTop: 32,
  },
  overviewTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 10,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  addWatchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  addWatchlistButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  otherInfo: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 50,
    paddingTop: 50,
    paddingBottom: 90,
  },
  topBillCastTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  separator: {
    marginTop: 35,
    marginBottom: 25,
    width: '100%',
    height: 2,
    backgroundColor: '#E4E4E4',
  },
  recommendationsTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
});

export default MovieDetailScreen;
