import { StatusBar } from 'expo-status-bar';
import ListItem from '../../components/ListItem';
import {
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';
import { useState } from 'react';

const AddDietTextSearchScreen = () => {
  // const items = ['피자', '치킨', '뼈해장국', '짬뽕', '볶음밥'];

  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const foods = [];
  for (let i = 1; i < 501; i++) {
    foods.push({ id: i, name: `음식 ${i}` });
  }

  const updateSearch = (search) => {
    setSearch(search);

    const filteredResults = foods.filter((item) =>
      item.toString().toLowerCase().includes(search.toString().toLowerCase())
    );

    setSearchResults(filteredResults);

    console.log(searchResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.container}></View>
        <Pressable
          onPress={() =>
            navigation.navigate('AddDietResult', { imageUri: data })
          }
          hitSlop={10}
          position={'absolute'}
          left={'5%'}
          bottom={'15%'}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
        </Pressable>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width * 0.8,
            height: 80,
            bottom: '1%',
            right: '5%',
          }}
        >
          <SearchBar
            placeholder="음식을 검색하세요..."
            onChangeText={updateSearch}
            value={search}
            platform={'ios'}
            height={40}
          />
        </View>

        <StatusBar style="dark" />
      </View>

      <View style={styles.result}>
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id.toString()}
          windowSize={10}
          renderItem={({ item }) => <ListItem item={item} />}
        />
        {/* ListItem 이용해서 검색결과에 따라 음식 보여줄 수 있게 -- FlatList 사용 */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: 150,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  result: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: 150,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
  },
});

export default AddDietTextSearchScreen;
