/* eslint-disable react/prop-types */
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddDietResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { image, uri, analysisResult } = route.params;

  const food = analysisResult.data;
  console.log(food);

  const onPress = (food) => {
    navigation.navigate("AddDietSetting", { image: image, food });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>이미지 분석 결과</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("AddDietImage")}
          hitSlop={10}
          position={"absolute"}
          left={"5%"}
          bottom={"15%"}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.title}>
        <Image
          style={styles.titleImage}
          source={require("../../../assets/AddDietResult.png")}
        />
      </View>

      <ScrollView style={styles.result}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.resultTitle}>
            {food.length === 0
              ? "어떤 음식인지 모르겠어요..."
              : "맛있는 식사를 하셨네요!"}
          </Text>
          <Text style={styles.resultSubtitle}>
            AI가 제대로 분석했는지 확인해주세요.
          </Text>
          <Image style={styles.resultImage} source={{ uri: uri }} />
          <View style={{ marginVertical: 10, width: "90%" }}>
            {food &&
              food.map((record, index) => (
                <View style={styles.foodContainer} key={index}>
                  <View style={styles.food}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        paddingRight: 10,
                      }}
                    >
                      {record.descKor}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#999999",
                        marginTop: 15,
                        paddingRight: 10,
                      }}
                    >
                      {record.makerName
                        ? `${record.foodGroup} / ${record.makerName}`
                        : record.foodGroup}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 17, marginRight: 20 }}>
                    {Math.round(record.kcal)} kcal
                  </Text>

                  <Pressable onPress={() => onPress(record)} hitSlop={30}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={30}
                      color={"#8B5CF6"}
                    />
                  </Pressable>
                </View>
              ))}
          </View>

          {/* <View style={styles.recordButton}>
            <Button
              title={"기록하기"}
              // 음식, 영양소 정보와 함께 navigate
              onPress={() =>
                navigation.navigate("AddDietSetting", {
                  image: image,
                  food: food,
                })
              }
            />
          </View> */}

          <View style={styles.search}>
            <Text style={styles.searchTitle}>
              {food.length === 0
                ? "음식명을 직접 검색해보세요!"
                : "혹시 잘못 인식되었나요?"}
            </Text>
            <MaterialCommunityIcons
              name="feature-search-outline"
              style={{
                paddingTop: 3,
                paddingBottom: 5,
              }}
              size={20}
              onPress={() =>
                navigation.navigate("AddDietTextSearch", {
                  image: image,
                  analysisResult: analysisResult,
                })
              }
            />
          </View>

          <Text style={styles.searchSubtitle}>
            {food.length === 0 ? "" : "음식명을 직접 검색해보세요!"}
          </Text>
        </View>
      </ScrollView>
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
    height: 100,
    backgroundColor: "#AD94F7",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    position: "absolute",
    bottom: "15%",
  },
  title: {
    position: "absolute",
    top: 100,
    left: 0,
    width: Dimensions.get("window").width,
    height: "20%",
    backgroundColor: "#AD94F7",
    alignItems: "center",
  },
  titleImage: {
    width: 110,
    height: 110,
  },
  resultImage: {
    width: 300,
    height: 200,
    borderRadius: 25,
    marginVertical: 20,
    resizeMode: "cover",
  },
  result: {
    flex: 1,
    position: "absolute",
    top: "30%",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
  },
  resultTitle: {
    fontWeight: "700",
    fontSize: 25,
    marginTop: 30,
    marginVertical: 10,
  },
  resultSubtitle: {
    color: "#999999",
    fontSize: 15,
  },
  recordButton: {
    width: Dimensions.get("window").width * 0.8,
    marginVertical: 20,
  },
  search: {
    flexDirection: "row",
    marginVertical: 10,
  },

  searchTitle: {
    fontWeight: "700",
    fontSize: 20,
    marginRight: 10,
    padding: 5,
  },

  searchSubtitle: {
    color: "#999999",
    fontSize: 15,
  },

  foodContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  food: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddDietResultScreen;
