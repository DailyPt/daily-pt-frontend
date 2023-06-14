import { View, Image, StyleSheet, Dimensions, Button } from "react-native";
import SettingPushSwitch from "../../components/SettingPushSwitch";
import { useState, useEffect, useContext } from "react";

const SettingPushScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.alarm}
          source={require("../../../assets/SettingAlarm.png")}
        />
      </View>

      <View style={styles.alarmWindow}>
        <View style={{ position: "absolute", top: "10%" }}>
          <SettingPushSwitch />
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
  title: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: "50%",
    backgroundColor: "#AD94F7",
    alignItems: "center",
  },
  alarm: {
    position: "absolute",
    top: "15%",
    width: 200,
    height: 200,
  },
  alarmWindow: {
    position: "absolute",
    top: "40%",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingPushScreen;
