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
import Button from "../../components/Button";

const AddDietResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { image, uri } = route.params;

  console.log(image);

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
          <Text style={styles.resultTitle}>든든한 한끼를 드셨군요!</Text>
          <Text style={[styles.resultSubtitle]}>
            AI가 제대로 분석했는지 확인해주세요.
          </Text>
          <Image style={styles.resultImage} source={{ uri: uri }} />
          {/* 음식 분석 결과 받아와 ListItem 형태로 출력  */}
          <View style={styles.recordButton}>
            <Button
              title={"기록하기"}
              // 음식, 영양소 정보와 함께 navigate
              onPress={() => navigation.navigate("AddDietSetting")}
            />
          </View>

          <View style={styles.search}>
            <Text style={styles.searchTitle}>혹시 잘못 인식되었나요?</Text>
            <MaterialCommunityIcons
              name="feature-search-outline"
              size={25}
              onPress={() =>
                navigation.navigate("AddDietTextSearch", { data: imageUri })
              }
            />
          </View>

          <Text style={styles.searchSubtitle}>
            음식명이나 카테고리를 통해 검색해보세요
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
    position: "absolute",
    top: 0,
  },
  resultImage: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.1,
    width: 300,
    height: 300,
    borderRadius: 25,
    margin: 10,
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
    position: "absolute",
    top: Dimensions.get("window").height * 0.03,
  },
  resultSubtitle: {
    color: "#999999",
    fontSize: 15,
    position: "absolute",
    top: Dimensions.get("window").height * 0.07,
  },
  recordButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.5,
  },
  search: {
    flexDirection: "row",
    top: Dimensions.get("window").height * 0.6,
  },

  searchTitle: {
    fontWeight: "700",
    fontSize: 25,
    marginRight: 30,
  },

  searchSubtitle: {
    color: "#999999",
    fontSize: 15,
    position: "absolute",
    top: Dimensions.get("window").height * 0.64,
  },
});

export default AddDietResultScreen;
