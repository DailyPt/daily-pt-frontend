/* eslint-disable react/prop-types */
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import SummaryButton, {
  TITLE,
  SUBTITLE,
  IMAGE,
} from "../../components/SummaryButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { getDietRecord } from "../../api/dietRecord";
import { getUserInfo } from "../../api/userInfo";

const fetchRecord = async (token, start, end, setDietRecord) => {
  try {
    const receivedInfo = await getDietRecord(token, start, end);
    setDietRecord(receivedInfo);
  } catch (error) {
    console.error("Error fetching dietRecord:", error);
  }
};

const DietSummaryScreen = ({ title }) => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const [todayRecord, setTodayRecord] = useState([]);
  const [userBmr, setUserBmr] = useState();

  const dt = new Date(title);
  const start =
    dt.getFullYear() +
    "-" +
    (dt.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (dt.getDate() - 1).toString().padStart(2, "0") +
    "T15:00:00.000Z";

  const end =
    dt.getFullYear() +
    "-" +
    (dt.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dt.getDate().toString().padStart(2, "0") +
    "T15:00:00.000Z";

  useEffect(() => {
    fetchRecord(authContext.token, start, end, setTodayRecord);
  }, [authContext.token]);

  useFocusEffect(() => {
    fetchRecord(authContext.token, start, end, setTodayRecord);
  });

  useEffect(() => {
    const fetchUserBmr = async () => {
      try {
        const bmr = await getUserInfo(authContext.token);

        setUserBmr(Math.round(bmr.bmr));
      } catch (error) {
        console.error("Error fetching userInfo: ", error);
      }
    };

    fetchUserBmr();
  }, [authContext.token]);

  // console.log("bmr: ", userBmr);

  let kcal = 0;
  let carbohydrate = 0;
  let protein = 0;
  let fat = 0;

  if (todayRecord && todayRecord.length) {
    for (let i = 0; i < todayRecord.length; i++) {
      if (todayRecord[i].id !== null) {
        kcal += Math.round(parseFloat(todayRecord[i].food.kcal));

        const parsedCarbohydrate = Math.round(
          parseFloat(todayRecord[i].food.carbohydrate)
        );
        carbohydrate += isNaN(parsedCarbohydrate) ? 0 : parsedCarbohydrate;
        const parsedProtein = Math.round(
          parseFloat(todayRecord[i].food.protein)
        );
        protein += isNaN(parsedProtein) ? 0 : parsedProtein;
        const parsedFat = Math.round(parseFloat(todayRecord[i].food.fat));
        fat += isNaN(parsedFat) ? 0 : parsedFat;
      }
    }
  }

  console.log(carbohydrate);

  const progressKcal = (kcal / userBmr) * 100;
  const progressCarbo = (carbohydrate / (userBmr * 0.65)) * 100;
  const progressProtein = (protein / (userBmr * 0.15)) * 100;
  const progressFat = (fat / (userBmr * 0.2)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.calorie}>
        <Pressable style={styles.button}>
          <Text style={styles.subTitle}>오늘의 영양소 정보</Text>
          <View style={{ position: "absolute", top: "22%", left: "10%" }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>열량</Text>
                </View>
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    {kcal} kcal
                  </Text>
                </View>
                <View
                  style={{
                    width: "37%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 7,
                  }}
                >
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        backgroundColor: "#AD94F7",
                        width: `${progressKcal}%`,
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  탄수화물
                </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {carbohydrate} g
                </Text>
              </View>
              <View
                style={{
                  width: "37%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 7,
                }}
              >
                <View style={styles.progressBar}>
                  <View
                    style={{
                      backgroundColor: "#AD94F7",
                      width: `${progressCarbo}%`,
                      flex: 1,
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    단백질
                  </Text>
                </View>
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    {protein} g
                  </Text>
                </View>
                <View
                  style={{
                    width: "37%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 7,
                  }}
                >
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        backgroundColor: "#AD94F7",
                        width: `${progressProtein}%`,
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>지방</Text>
                </View>
                <View style={{ width: Dimensions.get("window").width * 0.22 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    {fat} g
                  </Text>
                </View>
                <View
                  style={{
                    width: "37%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 7,
                  }}
                >
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        backgroundColor: "#AD94F7",
                        width: `${progressFat}%`,
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
      <View style={styles.record}>
        <SummaryButton
          title={TITLE.RECORD}
          subTitle={SUBTITLE.RECORD}
          imageRoute={IMAGE.RECORD}
          onPress={() => navigation.navigate("DaySelect")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
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
  calorie: {
    position: "absolute",
    top: "5%",
    marginBottom: 20,
  },
  record: {
    position: "absolute",
    top: "47%",
    marginBottom: 20,
  },
  button: {
    width: Dimensions.get("window").width * 0.88,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 25,
    position: "absolute",
    top: "30%",
    left: "10%",
  },

  subTitle: {
    color: "#666666",
    fontWeight: "500",
    fontSize: 15,
    position: "absolute",
    top: "12%",
    left: "10%",
  },
  progressBar: {
    height: 15,
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderColor: "#AD94F7",
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default DietSummaryScreen;
