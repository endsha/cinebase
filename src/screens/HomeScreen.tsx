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
import Dropdown from '@components/common/Dropdown';
import { Category, Movie, SortBy } from '@custom-types/common';
import { FlatList, Image } from 'react-native';
import MovieCard from '@components/common/MovieCard';
import { RootState } from '@redux/store';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setFilter } from '@redux/movieSlice';
import { useMovieListInfiniteQuery } from '@services/movieListService';
import Loading from '@components/common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

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
  // Redux state
  const filter = useAppSelector((state: RootState) => state.movie.filter);
  const dispatch = useAppDispatch();

  // Local state for sort, and search query
  const [sort, setSort] = React.useState<SortBy | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Using a query hook automatically fetches data and returns query values
  const { data, error, isFetching, fetchNextPage } = useMovieListInfiniteQuery({
    filter,
  });

  useEffect(() => {
    const restoreFilter = async () => {
      try {
        const storedFilter = await AsyncStorage.getItem('movieFilter');
        if (storedFilter) {
          dispatch(setFilter(storedFilter as Category));
        }
      } catch (e) {
        // Handle error if needed
        console.error('Failed to restore filter from AsyncStorage:', e);
      }
    };
    restoreFilter();
  }, [dispatch]);

  useEffect(() => {
    AsyncStorage.setItem('movieFilter', filter);
  }, [filter]);

  const movies: Movie[] = data?.pages.flat() ?? [];

  const handleSearch = () => {
    Alert.alert('Call API search with query:', searchQuery);
  };
  const handleLoadMore = () => {
    // Increase the page number to fetch more data
    fetchNextPage();
  };

  const handleChangeFilter = (newFilter: Category) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 28,
          }}
        >
          <Dropdown
            style={{ width: '100%' }}
            value={filter}
            items={categories}
            onSelect={item => {
              handleChangeFilter(item.value as Category);
              //
            }}
          />
          <Dropdown
            style={{ width: '100%', marginVertical: 16 }}
            placeholder="Sort By"
            value={sort}
            items={sortBy}
            onSelect={item => {
              setSort(item.value as SortBy);
            }}
          />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#999999"
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ width: '100%' }}
          data={movies}
          keyExtractor={item => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item }) => <MovieCard {...item} />}
          contentContainerStyle={styles.movieList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => {
            if (isFetching) {
              return (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Loading />
                </View>
              );
            }
            return movies && movies.length > 0 ? (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
              >
                <Text style={styles.loadMoreButtonText}>Load More</Text>
              </TouchableOpacity>
            ) : null;
          }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text>No movies found.</Text>
            </View>
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
  movieList: {
    paddingBottom: 16,
    paddingHorizontal: 28,
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
