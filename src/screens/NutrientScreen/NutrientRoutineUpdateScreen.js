import { View, Text, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import DayPicker from "../../components/DayPicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/Button";
import { updateAlarm } from "../../api/nutrientRoutine";

const NutrientRoutineUpdateScreen = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { id, alarmId, days, time } = route.params;
  console.log(id);
  console.log("alarmId: ", alarmId);
  console.log("days: ", days);
  console.log("time: ", time);

  const dayIndices = days.map((day, index) => index);
  console.log(dayIndices);

  const [hasChanges, setHasChanges] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayPress = (day) => {
    const normalizedDay = day;

    if (selectedDays.includes(normalizedDay)) {
      setSelectedDays(selectedDays.filter((date) => date !== normalizedDay));
    } else {
      setSelectedDays([...selectedDays, normalizedDay]);
    }

    setHasChanges(true);
  };

  const [selectedTimes, setSelectedTimes] = useState(new Date());
  const handleTimeChange = (event, time) => {
    setSelectedTimes(time);
    setHasChanges(true);
  };

  const hour = selectedTimes.getHours().toString().padStart(2, "0");
  const minute = selectedTimes.getMinutes().toString().padStart(2, "0");
  const newTime = `${hour}:${minute}:00`;

  const newAlarm = {
    days: dayIndices,
    time: time,
  };

  if (hasChanges) {
    const isDayChanged =
      JSON.stringify(selectedDays) !== JSON.stringify(dayIndices);
    const isTimeChanged = newTime !== time;

    if (isDayChanged) {
      newAlarm.days = selectedDays;
    }

    if (isTimeChanged) {
      newAlarm.time = newTime;
    }
  }
  console.log(newAlarm);

  const updateRoutine = async () => {
    try {
      const result = await updateAlarm(authContext.token, newAlarm, alarmId);
      if (result === 200) {
        Alert.alert("수정 완료", "영양제 알람이 수정되었습니다!");
        navigation.navigate("NutrientAlarmList", { id: id });
      } else {
        Alert.alert(
          "저장 실패",
          "알람이 수정되지 않았습니다. 다시 시도해보세요!"
        );
      }
    } catch (error) {
      console.log("Error saving diet record:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <View
          style={{
            padding: 5,
            marginVertical: 50,
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 22 }}>섭취요일</Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              justifyContent: "space-evenly",
            }}
          >
            <DayPicker
              title={"일"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(0)}
            />
            <DayPicker
              title={"월"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(1)}
            />
            <DayPicker
              title={"화"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(2)}
            />
            <DayPicker
              title={"수"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(3)}
            />
            <DayPicker
              title={"목"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(4)}
            />
            <DayPicker
              title={"금"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(5)}
            />
            <DayPicker
              title={"토"}
              selectedDays={selectedDays}
              onPress={() => handleDayPress(6)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 5,
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 22 }}>섭취 시간</Text>
          <DateTimePicker
            value={selectedTimes}
            mode="time"
            onChange={handleTimeChange}
            locale="ko-KR"
            style={{
              backgroundColor: "#F8F8FA",
              width: 100,
              position: "absolute",
              right: "3%",
              alignItems: "center",
              marginVertical: 10,
              paddingVertical: 10,
            }}
          />
        </View>
        <View style={styles.setButton}>
          <Button
            title={"수정하기"}
            disabled={!hasChanges}
            onPress={() => updateRoutine()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AD94F7",
    alignItems: "center",
  },
  setting: {
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
    padding: 20,
  },
  setButton: {
    position: "absolute",
    width: "90%",
    height: "20%",
    bottom: "15%",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
  },
});

export default NutrientRoutineUpdateScreen;
