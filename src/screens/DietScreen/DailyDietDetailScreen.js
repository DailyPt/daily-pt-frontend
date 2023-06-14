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
import { getDietRecord, deleteDietRecord } from "../../api/dietRecord";

const fetchRecord = async (token, start, end, setDietRecord) => {
  try {
    const receivedInfo = await getDietRecord(token, start, end);
    setDietRecord(receivedInfo);
  } catch (error) {
    console.error("Error fetching dietRecord:", error);
  }
};

const DailyDietDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { start, end } = route.params;

  const authContext = useContext(AuthContext);
  const [dietRecord, setDietRecord] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const deleteRecord = async (id) => {
    try {
      Alert.alert(
        "식단 삭제",
        "정말로 삭제하시겠습니까?",
        [
          {
            text: "확인",
            onPress: async () => {
              await deleteDietRecord(authContext.token, id);
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
      console.error("Error deleting dietRecord:", error);
    }
  };

  useEffect(() => {
    fetchRecord(authContext.token, start, end, setDietRecord);
  }, [authContext.token, refreshFlag]);

  useFocusEffect(() => {
    fetchRecord(authContext.token, start, end, setDietRecord);
  });

  console.log(dietRecord);

  return (
    <View
      style={{
        height: 100,
        backgroundColor: "#AD94F7",
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.detailContainer} scrollEnabled={true}>
          {dietRecord &&
            dietRecord.map((record, index) => (
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
                    style={styles.buttonModify}
                    hitSlop={10}
                    onPress={() =>
                      navigation.navigate("DietDetail", {
                        id: record.id,
                        start: start,
                        end: end,
                      })
                    }
                  >
                    <Text style={styles.buttonTextModify}>수정</Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonDelete}
                    hitSlop={10}
                    onPress={() => deleteRecord(record.id)}
                  >
                    <Text style={styles.buttonTextDelete}>삭제</Text>
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
  buttonModify: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.05,
    borderRadius: 30,
    position: "absolute",
    top: 20,
    right: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
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
    position: "absolute",
    right: 0,
    top: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  buttonTextDelete: {
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default DailyDietDetailScreen;
