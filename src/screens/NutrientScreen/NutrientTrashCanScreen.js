import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Text,
  Alert,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext, useEffect } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { getTrashCan, restoreNutrient } from "../../api/nutrientRoutine";

const fetchNutrient = async (token, setTrashCan) => {
  try {
    const receivedInfo = await getTrashCan(token);
    setTrashCan(receivedInfo);
  } catch (error) {
    console.error("Error fetching dietRecord:", error);
  }
};

const getDayName = (dayNumber) => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return dayNames[dayNumber];
};

const NutrientTrashCanScreen = () => {
  const authContext = useContext(AuthContext);
  const [trashCan, setTrashCan] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const restoreNut = async (id) => {
    try {
      Alert.alert(
        "영양제 복원",
        "영양제를 복원하시겠습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await restoreNutrient(authContext.token, id);
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
      console.error("Error restoring dietRecord:", error);
    }
  };

  useEffect(() => {
    fetchNutrient(authContext.token, setTrashCan);
  }, [authContext.token, refreshFlag]);

  useFocusEffect(() => {
    fetchNutrient(authContext.token, setTrashCan);
  });

  return (
    <View
      style={{
        height: 100,
        backgroundColor: "#AD94F7",
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.detailContainer} scrollEnabled={true}>
          {trashCan &&
            trashCan.map((record, index) => {
              const days = record.days.split(",").map(Number);
              const dayNames = days.map(getDayName);

              return (
                <Pressable key={index} style={styles.detail}>
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
                      padding: 5,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Pressable
                      style={styles.buttonRestore}
                      hitSlop={10}
                      onPress={() => restoreNut(record.id)}
                    >
                      <Text style={styles.buttonTextRestore}>복원</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
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
    top: 10,
    height: Dimensions.get("window").height * 0.3,
  },
  detail: {
    width: Dimensions.get("window").width * 0.88,
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
    marginBottom: 20,
  },
  buttonRestore: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.05,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    borderColor: "#AD94F7",
    borderWidth: 1,
  },
  buttonTextRestore: {
    color: "#AD94F7",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default NutrientTrashCanScreen;
