import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import SummaryButton, {
  IMAGE,
  SUBTITLE,
  TITLE,
} from "../../components/SummaryButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { useState, useContext, useEffect } from "react";
import { getNutrientRecord } from "../../api/nutrientRoutine";

const NutrientSummaryScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [record, setRecord] = useState();

  useEffect(() => {
    const fetchNutrient = async () => {
      try {
        const receivedInfo = await getNutrientRecord(authContext.token);
        setRecord(receivedInfo);
      } catch (error) {
        console.error("Error fetching nutrient:", error);
      }
    };

    fetchNutrient();
  }, []);

  console.log(record);

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
      <View style={styles.title}>
        <Image
          style={styles.nutrient}
          source={require("../../../assets/NutrientSummary.png")}
        />
      </View>

      <View style={styles.menu}>
        <View style={styles.record}>
          <Text
            style={{
              color: "#666666",
              fontWeight: "500",
              fontSize: 12,
              paddingLeft: 10,
              marginTop: 30,
            }}
          >
            오늘은 어떤 영양제를 드셨나요?
          </Text>
          <Text
            style={{
              color: "#222222",
              fontWeight: "700",
              fontSize: 25,
              marginVertical: 10,
              paddingLeft: 10,
            }}
          >
            오늘의 복용 기록
          </Text>

          <ScrollView
            style={{
              marginTop: 10,
              width: Dimensions.get("window").width * 0.78,
            }}
          >
            {record &&
              record.map((record, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.4,
                      marginRight: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "600" }}
                      numberOfLines={1}
                    >
                      {record.nutrient.supplement.productName}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.3,
                      marginRight: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "600" }}
                      numberOfLines={1}
                    >
                      {convertTimeFormat(record.date)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.08,
                      marginRight: 5,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      {record.nutrient.quantity}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
        <View>
          <SummaryButton
            title={TITLE.LIST}
            subTitle={SUBTITLE.LIST}
            imageRoute={IMAGE.LIST}
            onPress={() => navigation.navigate("NutrientDetail")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: "50%",
    backgroundColor: "#AD94F7",
    alignItems: "center",
  },
  nutrient: {
    position: "absolute",
    top: "5%",
  },
  menu: {
    position: "absolute",
    top: "20%",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
    alignItems: "center",
  },
  record: {
    width: Dimensions.get("window").width * 0.88,
    height: Dimensions.get("window").height * 0.25,
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
    marginVertical: 20,
  },
});

export default NutrientSummaryScreen;
