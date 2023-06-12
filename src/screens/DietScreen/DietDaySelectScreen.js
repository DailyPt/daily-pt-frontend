import { useState } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const DietDaySelectScreen = () => {
  const navigation = useNavigation();

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleStartDateChange = (event, newDate) => {
    const currentDate = newDate || selectedStartDate;
    setSelectedStartDate(currentDate);
  };

  console.log(selectedStartDate);

  const handleEndDateChange = (event, newDate) => {
    const currentDate = newDate || selectedEndDate;
    setSelectedEndDate(currentDate);
  };

  console.log(selectedEndDate);

  const endDate =
    selectedEndDate.getFullYear() +
    "-" +
    (selectedEndDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (selectedEndDate.getDate() + 1) +
    "T15:00:00.000Z";

  return (
    <View
      style={{
        height: 100,
        backgroundColor: "#AD94F7",
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 30,
            marginLeft: 10,
            marginVertical: 20,
          }}
        >
          날짜 선택
        </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            marginLeft: 10,
            marginVertical: 20,
            color: "#666666",
          }}
        >
          시작 날짜
        </Text>
        <View style={{ marginVertical: 20 }}>
          <DateTimePicker
            value={selectedStartDate}
            display="spinner"
            mode={"date"}
            onChange={handleStartDateChange}
            maximumDate={new Date()}
            style={{ height: 80 }}
            locale="ko-KR"
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              marginLeft: 10,
              marginVertical: 20,
              color: "#666666",
            }}
          >
            종료 날짜
          </Text>
          <DateTimePicker
            value={selectedEndDate}
            display="spinner"
            mode={"date"}
            onChange={handleEndDateChange}
            maximumDate={new Date()}
            style={{ height: 80 }}
            locale="ko-KR"
          />
        </View>
        <Pressable
          style={styles.button}
          hitSlop={10}
          onPress={() =>
            navigation.navigate("DailyDietDetail", {
              start: selectedStartDate.toISOString(),
              end: endDate,
            })
          }
        >
          <Text style={styles.buttonText}>선택완료</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    zIndex: 10,
    height: Dimensions.get("window").height * 0.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AD94F7",
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default DietDaySelectScreen;
