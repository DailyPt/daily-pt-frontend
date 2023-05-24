import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { saveDietRecord } from "../../api/dietRecord";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const AddDietRecordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const authContext = useContext(AuthContext);

  const { food, dietRecord } = route.params;
  console.log(food);
  console.log(dietRecord);

  const saveRecord = async () => {
    try {
      await saveDietRecord(authContext.token, dietRecord);
      navigation.navigate("Main", { screen: "Diet" });
    } catch (error) {
      console.log("Error saving diet record:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("AddDietSetting", { food })}
          hitSlop={10}
          position={"absolute"}
          left={"5%"}
          bottom={"15%"}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
        </Pressable>
      </View>
      <View style={styles.record}>
        <Text style={styles.recordTitle}>식단을 모두 기록하셨나요?</Text>
        <Text style={styles.recordSubtitle}>
          기록은 언제든 수정할 수 있으니 걱정마세요!
        </Text>
        <Image
          style={styles.image}
          source={require("../../../assets/AddDietRecord.png")}
        />
        <View style={styles.recordButton}>
          <Button
            title={"저장하기"}
            // onPress={() => saveRecord()}
            onPress={() => navigation.navigate("Main", { screen: "Diet" })}
          />
        </View>
      </View>
    </View>
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
  record: {
    position: "absolute",
    top: 150,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  recordTitle: {
    fontWeight: "700",
    fontSize: 30,
    position: "absolute",
    top: "5%",
  },
  recordSubtitle: {
    color: "#999999",
    fontSize: 15,
    position: "absolute",
    top: "12%",
  },
  image: {
    width: 200,
    height: 200,
    position: "absolute",
    top: "25%",
  },
  recordButton: {
    position: "absolute",
    bottom: "10%",
  },
});

export default AddDietRecordScreen;
