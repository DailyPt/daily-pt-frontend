import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { getSupplementList } from "../../api/supplement";
import ListSupplement from "../../components/ListSupplement";

const AddNutrientTextSearchScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateSearch = async (search) => {
    setSearch(search);

    try {
      const suppList = await getSupplementList(search);
      setSearchResults(suppList);
    } catch (error) {
      console.log("Error fetching Supplement list:", error);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  const onPress = (supplement) => {
    navigation.navigate("AddNutrientSetting", { supplement });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.container}></View>
        <Pressable
          onPress={() => navigation.navigate("Main", { screen: "Nutrient" })}
          hitSlop={10}
          position={"absolute"}
          left={"5%"}
          bottom={"15%"}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
        </Pressable>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.8,
            height: 80,
            bottom: "1%",
            right: "5%",
          }}
        >
          <SearchBar
            placeholder="영양제를 검색하세요..."
            onChangeText={setSearch}
            value={search}
            platform={"ios"}
            height={40}
            onSubmitEditing={() => updateSearch(search)}
            onClear={clearSearch}
          />
        </View>

        <StatusBar style="dark" />
      </View>

      {searchResults.length ? (
        <View style={styles.result}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            windowSize={10}
            renderItem={({ item }) => (
              <ListSupplement item={item} onPress={() => onPress(item)} />
            )}
          />
        </View>
      ) : (
        <View style={styles.result}>
          <Text
            style={{
              color: "#999999",
              fontSize: 25,
              marginTop: 30,
              left: "27%",
            }}
          >
            검색 결과가 없습니다.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  result: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    top: 150,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
  },
});

export default AddNutrientTextSearchScreen;
