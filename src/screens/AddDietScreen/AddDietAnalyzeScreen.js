import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const AddDietAnalyzeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { image, uri, analysisResult } = route.params;

  useEffect(() => {
    // if (typeof analysisResult === "undefined") {
    //   Alert.alert("인식 실패", "텍스트로 검색해보세요.");
    //   navigation.navigate("AddDietTextSearch", {
    //     image: image,
    //   });
    //   return;
    // }

    const analysisTimeout = setTimeout(() => {
      navigation.navigate("AddDietResult", {
        image: image,
        uri: uri,
        analysisResult: analysisResult,
      });
    }, 3000);

    return () => {
      clearTimeout(analysisTimeout);
    };
  }, [navigation, analysisResult]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI 식단 분석 중...</Text>
      <Text style={[styles.subtitle, { position: "absolute", top: "20%" }]}>
        아주 잠시만 조금만 기다려주세요!
      </Text>
      <Image
        style={styles.image}
        source={require("../../../assets/AddDietLoading.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    position: "absolute",
    top: "15%",
  },
  subtitle: {
    color: "#999999",
    fontSize: 15,
  },
  image: {},
});

export default AddDietAnalyzeScreen;
