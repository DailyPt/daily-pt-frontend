import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import DayPicker from "../../components/DayPicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useContext } from "react";
import NumericInput from "react-native-numeric-input";
import { saveNutrientRoutine } from "../../api/nutrientRoutine";
import { AuthContext } from "../../store/auth-context";

const AddNutrientSettingScreen = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { supplement } = route.params;

  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayPress = (day) => {
    const normalizedDay = day;

    if (selectedDays.includes(normalizedDay)) {
      setSelectedDays(selectedDays.filter((date) => date !== normalizedDay));
    } else {
      setSelectedDays([...selectedDays, normalizedDay]);
    }
  };

  const [count, setCount] = useState(0);

  const [selectedTimes, setSelectedTimes] = useState([]);
  const handleTimeChange = (date, index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index] = date;
    setSelectedTimes(updatedTimes);
  };

  const renderDateTimePickers = () => {
    const pickers = [];
    for (let i = 0; i < count; i++) {
      pickers.push(
        <View
          key={i}
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 5,
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            섭취 시간 {i + 1}
          </Text>
          <DateTimePicker
            value={selectedTimes[i] || new Date()}
            mode="time"
            onChange={(event, time) => handleTimeChange(time, i)}
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
      );
    }
    return pickers;
  };

  const times = [];
  for (let i = 0; i < selectedTimes.length; i++) {
    const timeObject = selectedTimes[i];
    const hour = timeObject.getHours().toString().padStart(2, "0");
    const minute = timeObject.getMinutes().toString().padStart(2, "0");
    const time = `${hour}:${minute}:00`;
    times.push(time);
  }

  const [quantity, setQuantity] = useState(0);

  const nutrientRoutine = {
    supplementId: supplement.id,
    days: selectedDays,
    count: count,
    times: times,
    quantity: quantity,
  };

  console.log(nutrientRoutine);

  const saveRoutine = async () => {
    try {
      const result = await saveNutrientRoutine(
        authContext.token,
        nutrientRoutine
      );
      if (result === 200) {
        Alert.alert("저장 완료", "영양제 루틴이 생성되었습니다!");
        navigation.navigate("Main", { screen: "Nutrient" });
      } else {
        Alert.alert(
          "저장 실패",
          "영양제 루틴이 저장되지 않았습니다. 다시 시도해보세요!"
        );
      }
    } catch (error) {
      console.log("Error saving nutrient routine:", error);
    }
  };

  const isCountZero = count === 0;
  const isQuantityZero = quantity === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.foodTitle}>{supplement.productName}</Text>
          <Text style={styles.foodCalorie}>{supplement.srvUse}</Text>
          <View
            style={{
              width: "100%",
              top: "22%",
              borderColor: "#E6E6E6",
              borderWidth: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: 10,
            }}
          />
        </View>
        <ScrollView
          style={{
            position: "absolute",
            top: "30%",
            height: "50%",
          }}
        >
          <View
            style={{
              padding: 5,
              marginTop: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 20 }}>섭취요일</Text>

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
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 20 }}>섭취 횟수</Text>
            <NumericInput
              value={count}
              onChange={(value) => setCount(value)}
              totalWidth={150}
              minValue={0}
              totalHeight={50}
              iconSize={20}
              rounded
              separatorWidth={0}
              containerStyle={{
                backgroundColor: "#F8F8FA",
                position: "absolute",
                right: 0,
                top: 0,
                marginHorizontal: 10,
              }}
              iconStyle={{ color: "#000" }}
              rightButtonBackgroundColor="#F8F8FA"
              leftButtonBackgroundColor="#F8F8FA"
              borderColor={"#E5E7EB"}
            />
          </View>
          {renderDateTimePickers()}

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 5,
              marginVertical: 20,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              섭취량 ( x 포 / 정 )
            </Text>
            <NumericInput
              value={quantity}
              onChange={(value) => setQuantity(value)}
              totalWidth={150}
              minValue={0}
              totalHeight={50}
              iconSize={20}
              rounded
              separatorWidth={0}
              containerStyle={{
                backgroundColor: "#F8F8FA",
                position: "absolute",
                right: 0,
                top: 0,
                marginHorizontal: 10,
              }}
              iconStyle={{ color: "#000" }}
              rightButtonBackgroundColor="#F8F8FA"
              leftButtonBackgroundColor="#F8F8FA"
              borderColor={"#E5E7EB"}
            />
          </View>
        </ScrollView>
        <View style={styles.setButton}>
          <View
            style={{
              width: "100%",
              borderColor: "#E6E6E6",
              borderWidth: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 5,
            }}
          />
          <Pressable
            style={{ margin: 15 }}
            onPress={() =>
              navigation.navigate("AddNutrientDetail", { supplement })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#666666" }}>
              자세한 정보
            </Text>
          </Pressable>
          <Button
            title={"루틴 저장하기"}
            disabled={isQuantityZero || isCountZero}
            onPress={() => saveRoutine()}
          />
        </View>
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
  foodTitle: {
    fontWeight: "700",
    fontSize: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    marginVertical: 10,
  },
  foodCalorie: {
    color: "#999999",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    marginVertical: 10,
  },
  setButton: {
    position: "absolute",
    width: "100%",
    height: "20%",
    bottom: "1%",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
  },
});

export default AddNutrientSettingScreen;
