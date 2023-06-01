import { View, Image, StyleSheet, Dimensions, Button } from "react-native";
import SettingPushSwitch from "../../components/SettingPushSwitch";
import { useState, useEffect, useContext } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { getNutrientRoutine } from "../../api/nutrientRoutine";
import { AuthContext } from "../../store/auth-context";

const SettingPushScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [routines, setRoutines] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchRoutines();
  }, []);

  useEffect(() => {
    if (isEnabled && routines.length > 0) {
      scheduleNotifications();
    } else {
      cancelScheduledNotifications();
    }
  }, [isEnabled, routines]);

  const fetchRoutines = async () => {
    try {
      const routinesData = await getNutrientRoutine(authContext.token); // Call your API function to fetch the routines
      setRoutines(routinesData);
    } catch (error) {
      console.log("Error fetching routines:", error);
    }
  };

  const scheduleNotifications = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") {
      routines.forEach((routine) => {
        const { times } = routine; // Assuming the routine object has a "times" property containing the scheduled times
        times.forEach((time) => {
          const parts = time.split(":");
          const timeObject = new Date();
          timeObject.setHours(parseInt(parts[0], 10));
          timeObject.setMinutes(parseInt(parts[1], 10));
          timeObject.setSeconds(parseInt(parts[2], 10));
          const notificationTime = timeObject; // Convert the time string to a Date object
          Notifications.scheduleNotificationAsync({
            content: {
              title: `${routine.productName} 드실 시간입니다!`,
              body: `${routine.productName}이 당신을 기다리고 있어요. 물과 함께 섭취하세요.`,
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true, // Set to true if the notification should repeat daily at the same time
            },
          });
        });
      });
    }
  };

  const cancelScheduledNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };

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
          <SettingPushSwitch
            value={isEnabled}
            onValueChange={() =>
              setIsEnabled((previousState) => !previousState)
            }
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
