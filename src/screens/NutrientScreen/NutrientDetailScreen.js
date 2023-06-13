/* eslint-disable react/prop-types */
import {
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  Alert,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  getNutrientByDay,
  deleteNutrientRoutine,
  saveNutrientRecord,
} from "../../api/nutrientRoutine";

const NutrientDetailScreen = ({ title }) => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const dt = new Date(title);
  const dayNumber = dt.getDay();
  console.log(dayNumber);

  const [nutrient, setNutrient] = useState();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchNutrientRoutine = async () => {
      try {
        const receivedInfo = await getNutrientByDay(
          authContext.token,
          dayNumber
        );
        console.log(receivedInfo);
        setNutrient(receivedInfo);
      } catch (error) {
        console.error("Error fetching nutrient routine:", error);
      }
    };

    fetchNutrientRoutine();
  }, [dayNumber, refreshFlag]);
  console.log(nutrient);

  const getDayName = (dayNumber) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return dayNames[dayNumber];
  };

  const deleteNutrient = async (id) => {
    try {
      Alert.alert(
        "영양제 복용 루틴 삭제",
        "정말로 삭제하시겠습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await deleteNutrientRoutine(authContext.token, id);
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

      setRefreshFlag((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting nutrient record:", error);
    }
  };

  const saveRecord = async (id) => {
    try {
      Alert.alert(
        "영양제 복용",
        "정말로 복용하셨습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await saveNutrientRecord(authContext.token, id);
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
      console.error("Error saving nutrient record:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.detailContainer} scrollEnabled={true}>
        {nutrient &&
          nutrient.map((record, index) => {
            const days = record.days.split(",").map(Number);
            const dayNames = days.map(getDayName);

            return (
              <Pressable
                key={index}
                style={styles.detail}
                onPress={() =>
                  navigation.navigate("NutrientAlarmList", {
                    id: record.id,
                  })
                }
              >
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginTop: 25,
                    marginBottom: 10,
                    fontSize: 22,
                    fontWeight: "700",
                  }}
                >
                  {record.supplement.productName}
                </Text>

                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 10,
                  }}
                >
                  {record.supplement.srvUse}
                </Text>

                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  복용 요일 : {dayNames.join(", ")}
                </Text>

                <View
                  style={{
                    height: Dimensions.get("window").height * 0.08,
                    flexDirection: "row",

                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Pressable
                    style={styles.buttonModify}
                    hitSlop={10}
                    onPress={() => saveRecord(record.id)}
                  >
                    <Text style={styles.buttonTextModify}>복용</Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonDelete}
                    hitSlop={10}
                    onPress={() => deleteNutrient(record.id)}
                  >
                    <Text style={styles.buttonTextDelete}>삭제</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    zIndex: 10,
    height: Dimensions.get("window").height * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  detailContainer: {
    top: 30,
    height: Dimensions.get("window").height * 0.3,
  },
  detail: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.25,
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
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.05,
    borderRadius: 30,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#AD94F7",
    borderWidth: 1,
  },
  buttonTextModify: {
    color: "#AD94F7",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonDelete: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.05,

    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  buttonTextDelete: {
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default NutrientDetailScreen;
