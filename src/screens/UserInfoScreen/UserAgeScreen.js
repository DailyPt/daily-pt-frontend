import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserInfoButton from "../../components/UserInfoButton";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";

const UserAgeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);

  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;

    setDisabled(false);
    setSelectedDate(currentDate);
  };

  console.log(selectedDate);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding" })}
    >
      <View>
        <Text style={styles.title}>{name} 님의 생일을 알려주세요.</Text>
        <Text style={styles.detail}>만 나이를 기준으로 관리해드릴게요!</Text>
        <DateTimePicker
          style={styles.picker}
          value={selectedDate}
          display="spinner"
          mode={"date"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />

        <UserInfoButton
          title="다음"
          onPress={() =>
            navigation.navigate("Height", {
              name: name,
              birth: selectedDate.toLocaleDateString().toString(),
            })
          }
          disabled={disabled}
        />
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
};

UserAgeScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.1,
    left: Dimensions.get("window").width * 0.06,
    fontSize: 26,
    fontWeight: "900",
  },
  detail: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.15,
    left: Dimensions.get("window").width * 0.06,
    fontSize: 16,
    color: "#666666",
  },
  picker: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.33,
    left: Dimensions.get("window").width * 0.06,
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
  },
});

export default UserAgeScreen;
