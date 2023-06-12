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
import { getTrashCan, restoreDietRecord } from "../../api/dietRecord";

const fetchRecord = async (token, setTrashCan) => {
  try {
    const receivedInfo = await getTrashCan(token);
    setTrashCan(receivedInfo);
  } catch (error) {
    console.error("Error fetching dietRecord:", error);
  }
};

const DietTrashCanScreen = () => {
  const authContext = useContext(AuthContext);
  const [trashCan, setTrashCan] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const restoreRecord = async (id) => {
    try {
      Alert.alert(
        "식단 복원",
        "식단을 복원하시겠습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await restoreDietRecord(authContext.token, id);
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
    fetchRecord(authContext.token, setTrashCan);
  }, [authContext.token, refreshFlag]);

  useFocusEffect(() => {
    fetchRecord(authContext.token, setTrashCan);
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
            trashCan.map((record, index) => (
              <Pressable key={index} style={styles.detail}>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.2,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.3,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 5,
                    }}
                  >
                    <Image
                      source={{ uri: record.photoLink }}
                      style={{
                        width: Dimensions.get("window").width * 0.25,
                        height: Dimensions.get("window").width * 0.25,
                        padding: 20,
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                  <View
                    style={{
                      maxWidth: Dimensions.get("window").width * 0.45,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "700",
                        marginBottom: 12,
                        flexShrink: 1,
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {record.food.descKor}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: "#333333",
                        marginBottom: 15,
                      }}
                    >
                      식사 일시 :{"\n"}
                      {new Date(record.date).toLocaleString("ko-KR")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: "#333333",
                      }}
                    >
                      {record.memo}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.1,
                    flexDirection: "row",
                    padding: 5,
                  }}
                >
                  <Pressable
                    style={styles.buttonRestore}
                    hitSlop={10}
                    onPress={() => restoreRecord(record.id)}
                  >
                    <Text style={styles.buttonTextRestore}>복원</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
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
    height: Dimensions.get("window").height * 0.3,
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
    position: "absolute",
    top: 20,
    right: 0,
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

export default DietTrashCanScreen;
