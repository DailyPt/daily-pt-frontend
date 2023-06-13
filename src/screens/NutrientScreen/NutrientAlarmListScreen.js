import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import {
  getAllAlarm,
  getNutrientById,
  deleteNutrientAlarm,
} from "../../api/nutrientRoutine";
import { AuthContext } from "../../store/auth-context";

const fetchAlarm = async (token, id, setAlarm) => {
  try {
    const receivedInfo = await getAllAlarm(token, id);
    setAlarm(receivedInfo);
  } catch (error) {
    console.error("Error fetching dietRecord:", error);
  }
};

const NutrientAlarmListScreen = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [nutrient, setNutrient] = useState();
  const [alarm, setAlarm] = useState();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { id } = route.params;
  // console.log(id);

  useEffect(() => {
    const fetchNutrient = async () => {
      try {
        const receivedInfo = await getNutrientById(authContext.token, id);
        setNutrient(receivedInfo);
      } catch (error) {
        console.error("Error fetching nutrient:", error);
      }
    };

    fetchNutrient();
  }, []);

  useEffect(() => {
    fetchAlarm(authContext.token, id, setAlarm);
  }, [authContext.token, refreshFlag]);

  useFocusEffect(() => {
    fetchAlarm(authContext.token, id, setAlarm);
  });

  const deleteAlarm = async (id) => {
    try {
      Alert.alert(
        "영양제 알람 삭제",
        "정말로 삭제하시겠습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await deleteNutrientAlarm(authContext.token, id);
              setRefreshFlag((prevState) => !prevState);
            },
          },
          {
            text: "취소",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error deleting nutrient record:", error);
    }
  };

  const nutrientProductName = nutrient?.supplement?.productName || "";

  const convertTimeFormat = (time) => {
    const [hour, minute] = time.split(":");
    const hourNumber = parseInt(hour, 10);
    const meridiem = hourNumber < 12 ? "오전" : "오후";
    const adjustedHour = hourNumber % 12 || 12;
    const convertedTime = `${meridiem} ${adjustedHour}시 ${minute}분`;

    return convertedTime;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <View
          style={{
            marginVertical: 10,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "700" }}>
            {nutrientProductName}
          </Text>
          <View
            style={{
              width: "100%",
              borderColor: "#E6E6E6",
              borderWidth: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: 20,
            }}
          />
        </View>
        <ScrollView style={styles.detailContainer} scrollEnabled={true}>
          {alarm &&
            alarm.map((record, index) => {
              const days = [];
              if (record.sunday === true) {
                days.push("일");
              }
              if (record.monday === true) {
                days.push("월");
              }
              if (record.tuesday === true) {
                days.push("화");
              }
              if (record.wednesday === true) {
                days.push("수");
              }
              if (record.thursday === true) {
                days.push("목");
              }
              if (record.friday === true) {
                days.push("금");
              }
              if (record.saturday === true) {
                days.push("토");
              }

              return (
                <Pressable key={index} style={styles.detail}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      marginVertical: 15,
                      color: "#999999",
                    }}
                  >
                    {days.join(", ")}
                  </Text>
                  <Text style={{ fontSize: 25, fontWeight: "700" }}>
                    {convertTimeFormat(record.time)}
                  </Text>
                  <View
                    style={{
                      height: Dimensions.get("window").height * 0.05,
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Pressable
                      style={styles.buttonModify}
                      hitSlop={10}
                      onPress={() =>
                        navigation.navigate("NutrientRoutineUpdate", {
                          id: id,
                          alarmId: record.id,
                          days: days,
                          time: record.time,
                        })
                      }
                    >
                      <Text style={styles.buttonTextModify}>수정</Text>
                    </Pressable>
                    <Pressable
                      style={styles.buttonDelete}
                      hitSlop={10}
                      onPress={() => deleteAlarm(record.id)}
                    >
                      <Text style={styles.buttonTextDelete}>삭제</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
        </ScrollView>
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
  detail: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.15,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  buttonModify: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").height * 0.03,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
    borderColor: "#AD94F7",
    borderWidth: 1,
  },
  buttonTextModify: {
    color: "#AD94F7",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonDelete: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").height * 0.03,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",

    borderColor: "#FF0000",
    borderWidth: 1,
  },
  buttonTextDelete: {
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default NutrientAlarmListScreen;
