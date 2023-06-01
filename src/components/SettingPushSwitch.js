import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  Switch,
} from "react-native";
import { useState } from "react";

const SettingPushSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.push}>
      <Text style={styles.title}>영양제 푸시 알림 설정</Text>
      <Text style={styles.subTitle}>
        영양제 알림 설정에 동의하시면{"\n"}놓치지 않고 영양제를 섭취하실 수
        있도록{"\n"}도와드릴게요!
      </Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#AD94F7" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Image
        style={styles.image}
        source={require("../../assets/SettingAlarmNutrient.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  push: {
    width: Dimensions.get("window").width * 0.88,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 22,
    position: "absolute",
    top: "15%",
    left: "7.5%",
  },

  subTitle: {
    color: "#666666",
    fontWeight: "500",
    fontSize: 12,
    position: "absolute",
    top: "50%",
    left: "7.5%",
  },

  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    position: "absolute",
    bottom: "15%",
    right: "7.5%",
  },
  switch: {
    position: "absolute",
    top: "15%",
    right: "7.5%",
  },
});

export default SettingPushSwitch;
