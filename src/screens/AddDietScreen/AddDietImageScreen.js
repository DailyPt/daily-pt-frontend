import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker"; // 배포 시 react-native-image-picker로 변환
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { requestAnalyze } from "../../api/image";
import { AuthContext } from "../../store/auth-context";

//import { Platform } from "react-native";

const AddDietImageScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    requestCameraPermission();
    requestGalleryPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need gallery permissions to make this work!");
    }
  };

  const getFileName = (uri) => {
    const path = uri.split("/");

    return path[path.length - 1];
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      const fileName = getFileName(selectedImageUri);
      console.log("filename : ", fileName);

      const photo = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: fileName,
      };

      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("foodId", "1");
      formData.append("memo", "메모");
      formData.append("rating", "5");
      formData.append("quantity", 2);
      formData.append("date", "2023/05/30 12:02:00");

      console.log("formData: ", JSON.stringify(formData));

      const analysisResult = await requestAnalyze(formData);

      console.log("Analysis result:", analysisResult);

      navigation.navigate("AddDietAnalyze", {
        image: photo,
        uri: selectedImageUri,
        analysisResult: analysisResult,
      });
    }
  };

  const handleChooseFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets.length > 0) {
      const assets = result.assets[0];
      console.log(assets);
      const selectedImageUri = result.assets[0].uri;

      const photo = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };

      const formData = new FormData();
      formData.append("photo", photo);
      // will be erased
      formData.append("foodId", "1");
      formData.append("memo", "메모");
      formData.append("rating", "5");
      formData.append("quantity", 2);
      formData.append("date", "2023/05/30 12:02:00");

      console.log("formData: ", JSON.stringify(formData));

      const analysisResult = await requestAnalyze(formData);

      console.log("Analysis result:", analysisResult);

      navigation.navigate("AddDietAnalyze", {
        image: photo,
        uri: selectedImageUri,
        analysisResult: analysisResult,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={require("../../../assets/AddDietImage.png")}
        />
        <Text style={styles.title}>AI 식단 이미지 분석</Text>
        <Text style={[styles.subtitle, { position: "absolute", top: "40%" }]}>
          오늘의 식단을 촬영하시면
        </Text>
        <Text style={[styles.subtitle, { position: "absolute", top: "43%" }]}>
          식단의 칼로리와 영양성분을 분석해드려요.
        </Text>
        <MaterialCommunityIcons
          name="alert"
          size={15}
          color={"#999999"}
          position={"absolute"}
          top={"72%"}
        />
        <Text style={[styles.subtitle, { position: "absolute", top: "75%" }]}>
          밝은 곳에서 위에서 아래로
        </Text>
        <Text style={[styles.subtitle, { position: "absolute", top: "78%" }]}>
          식사 전체를 촬영해주세요!
        </Text>
        <Pressable
          style={[
            styles.button,
            { left: Dimensions.get("window").width * 0.06 },
          ]}
          hitSlop={10}
          onPress={handleTakePhoto}
        >
          <Text style={styles.buttonText}>사진 촬영하기</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { right: Dimensions.get("window").width * 0.06 },
          ]}
          hitSlop={10}
          onPress={handleChooseFromGallery}
        >
          <Text style={styles.buttonText}>앨범에서 선택하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  info: {
    position: "absolute",
    top: "10%",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: 200,
    height: 200,
    top: "10%",
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    position: "absolute",
    top: "35%",
  },
  subtitle: {
    color: "#999999",
    fontSize: 15,
  },
  button: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.75,
    width: Dimensions.get("window").width * 0.42,
    height: Dimensions.get("window").height * 0.06,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AD94F7",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default AddDietImageScreen;
