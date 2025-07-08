import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import LeftArrowIcon from '@assets/icons/left-arrow.svg';
import { RootStackParamList } from '@custom-types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import WatchListIcon from '@assets/icons/watchlist.svg';
import {
  useMovieDetailQuery,
  useMovieCreditsQuery,
  useMovieRecommendationsQuery,
} from '@services/movieDetailService';
import Loading from '@components/common/Loading';
import { MovieDetail } from '@custom-types/movie';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type CastMember = {
  id: string;
  imageUrl: string;
  name: string;
  role: string;
};

type Recommendation = {
  id: string;
  name: string;
  imageUrl: string;
  userScorePercent: number;
};

const MovieDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();
  const { movieId } = route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    data: movieDetail,
    isLoading: movieDetailIsLoading,
    error: movieDetailError,
  } = useMovieDetailQuery({
    movieId,
  });

  const {
    data: movieCredits,
    isLoading: movieCreditsIsLoading,
    error: movieCreditsError,
  } = useMovieCreditsQuery({
    movieId,
  });

  const {
    data: movieRecommendations,
    isLoading: movieRecommendationsIsLoading,
    error: movieRecommendationsError,
  } = useMovieRecommendationsQuery({
    movieId,
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRecommendationPress = (id: string) => {
    navigation.push('MovieDetail', {
      movieId: id,
    });
  };

  if (
    movieDetailIsLoading ||
    movieCreditsIsLoading ||
    movieRecommendationsIsLoading
  ) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Loading />
      </SafeAreaView>
    );
  }

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
            {movieDetail.name}
          </Text>
        </View>

        <View style={styles.overviewInfo}>
          <Image
            source={{ uri: movieDetail.imageUrl }}
            style={styles.movieImage}
          />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...styles.overviewText, ...styles.ageRating }}>
                {movieDetail.ageRating}
              </Text>
            </View>

            <Text style={styles.overviewText}>
              {movieDetail.releaseDate} • {movieDetail.duration}
            </Text>
            <Text style={styles.overviewText}>
              {movieDetail.genres.join(', ')}
            </Text>
            <Text style={styles.overviewText}>
              <Text style={{ fontWeight: '600' }}>Status: </Text>
              {movieDetail.status}
            </Text>
            <Text style={styles.overviewText}>
              <Text style={{ fontWeight: '600' }}>Original Language: </Text>
              {movieDetail.language}
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
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AnimatedCircularProgress
                size={52}
                width={3}
                fill={Math.round((movieDetail.score / 10) * 100)}
                tintColor="#45FF8F"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#D0D2D366"
                style={{ transform: [{ rotate: '-90deg' }] }}
                lineCap="round"
              />
              <View style={{ position: 'absolute', flexDirection: 'row' }}>
                <Text style={styles.userScoreValue}>
                  {Math.round((movieDetail.score / 10) * 100)}
                </Text>
                <Text style={styles.scorePercent}>%</Text>
              </View>
            </View>
            <Text style={styles.userScoreTitle}>User Score</Text>
          </View>

          <View style={{ flex: 1 }}>
            {movieCredits.crew
              .filter(
                (member: any) =>
                  member.job === 'Director' || member.job === 'Writer',
              )
              .map((member: any, idx: number) => (
                <View key={member.id} style={{ marginBottom: 15 }}>
                  <Text style={styles.authorName}>{member.name}</Text>
                  <Text style={styles.authorRole}>{member.job}</Text>
                </View>
              ))}
          </View>
        </View>
        <Text style={styles.shortDescription}>
          {movieDetail.shortDescription}
        </Text>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.descriptionText}>{movieDetail.description}</Text>
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
            data={movieCredits.cast}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 25,
            }}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', color: '#000' }}>
                No cast members available.
              </Text>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            renderItem={({ item }) => (
              <View style={styles.castMember}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: 155, borderRadius: 5 }}
                />
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                  <Text style={styles.castName}>{item.name}</Text>
                  <Text style={styles.castCharacter}>{item.character}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          <FlatList
            data={movieRecommendations}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 25,
            }}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', color: '#000' }}>
                No recommendations available.
              </Text>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendedMovie}
                onPress={() => handleRecommendationPress(item.id)}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: 162, borderRadius: 5 }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}
                >
                  <Text style={styles.recommendedMovieName}>{item.name}</Text>
                  <Text style={styles.recommendedMovieScore}>
                    {Math.round((item.score / 10) * 100)}%
                  </Text>
                </View>
              </TouchableOpacity>
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
  userScoreValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  scorePercent: {
    color: '#fff',
    fontSize: 6,
    fontWeight: '700',
    marginTop: 5,
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
    marginLeft: 30,
  },
  castMember: {
    width: 160,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Android shadow
  },
  castName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  castCharacter: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  separator: {
    marginTop: 15,
    marginBottom: 25,
    width: '100%',
    height: 2,
    backgroundColor: '#E4E4E4',
  },
  recommendationsTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginLeft: 30,
  },
  recommendedMovie: {
    width: 286,
    backgroundColor: '#fff',
  },
  recommendedMovieName: {
    color: '#000',
    fontWeight: '400',
    fontSize: 18,
  },
  recommendedMovieScore: {
    color: '#000',
    fontWeight: '400',
    fontSize: 18,
  },
});

export default MovieDetailScreen;
