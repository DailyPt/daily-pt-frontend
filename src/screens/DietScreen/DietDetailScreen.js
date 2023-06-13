/* eslint-disable react/prop-types */
import { Text, StyleSheet, View, Pressable, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDietById, updateDietById } from "../../api/dietRecord";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SettingInput, {
  keyBoardType,
  ReturnKeyTypes,
} from "../../components/SettingInput";
import { Rating } from "react-native-ratings";
import Button from "../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import NumericInput from "react-native-numeric-input";

const DietDetailScreen = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { id, start, end } = route.params;
  console.log(id);

  const [dietRecord, setDietRecord] = useState({});

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const diet = await getDietById(authContext.token, id);

        setDietRecord(diet);
      } catch (error) {
        console.error("Error fetching userInfo:", error);
      }
    };

    fetchDiet();
  }, [authContext.token, id]);

  console.log("dietRecord", dietRecord.food);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateModified, setIsDateModified] = useState(false);
  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setSelectedDate(currentDate);
    setIsDateModified(true);
  };

  const [ratingValue, setRatingValue] = useState(0);
  const updateRating = (newRating) => {
    setRatingValue(newRating);
  };

  const [quantity, setQuantity] = useState(0);
  const [memo, setMemo] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "memo":
        setMemo(enteredValue);
        break;
    }
  }

  const updateDiet = async () => {
    const newDiet = {
      quantity:
        quantity !== dietRecord.quantity ? quantity : dietRecord.quantity,
      memo:
        memo !== dietRecord.memo ? (memo !== "" ? memo : " ") : dietRecord.memo,
      rating:
        ratingValue !== dietRecord.rating ? ratingValue : dietRecord.rating,
      date: isDateModified ? selectedDate.toISOString() : dietRecord.date,
    };

    console.log(newDiet);

    await updateDietById(authContext.token, newDiet, id);

    Alert.alert("수정 완료", "식단을 수정하였습니다!");
    navigation.navigate("DailyDietDetail", { start: start, end: end });
  };

  const isQuantityZero = quantity === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        {dietRecord && dietRecord.food && (
          <>
            <Text style={styles.foodTitle}>{dietRecord.food.descKor}</Text>
            <Text style={styles.foodCalorie}>{dietRecord.food.kcal} kcal</Text>
            <Pressable
              style={{ margin: 15, top: "17%" }}
              onPress={() =>
                navigation.navigate("DietDetailInfo", {
                  id: id,
                  start: start,
                  end: end,
                })
              }
            >
              <Text
                style={{ textDecorationLine: "underline", color: "#666666" }}
              >
                영양소 정보
              </Text>
            </Pressable>

            <View
              style={{
                position: "absolute",
                top: "25%",
                width: "90%",
                borderColor: "#E6E6E6",
                borderWidth: 3,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <KeyboardAwareScrollView style={styles.editWindow}>
              <View
                style={{
                  marginBottom: 60,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "700", position: "absolute", top: 0 }}
                >
                  섭취량 (x100g)
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
                    top: 0,
                    right: 0,
                  }}
                  iconStyle={{ color: "#000" }}
                  rightButtonBackgroundColor="#F8F8FA"
                  leftButtonBackgroundColor="#F8F8FA"
                  borderColor={"#E5E7EB"}
                />
              </View>
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text style={{ fontWeight: "700" }}>날짜</Text>
                <DateTimePicker
                  value={selectedDate}
                  display="spinner"
                  mode={"datetime"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  style={{ height: 80 }}
                  locale="ko-KR"
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontWeight: "700" }}>메모</Text>
                <SettingInput
                  title={"메모"}
                  placeholder={"기억을 간직하세요."}
                  keyboardType={keyBoardType.DEFAULT}
                  returnKeyType={ReturnKeyTypes.DONE}
                  textContentType={"none"}
                  value={memo}
                  onChangeText={updateInputValueHandler.bind(this, "memo")}
                />
              </View>
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text style={{ fontWeight: "700" }}>평점</Text>
                <Rating
                  type="custom"
                  ratingCount={5}
                  ratingColor="#f1c40f"
                  ratingBackgroundColor="#C3C7CF"
                  tintColor="#F8F8FA"
                  startingValue={ratingValue}
                  onFinishRating={updateRating}
                  jumpValue={0.5}
                  style={{ marginTop: 10 }}
                />
              </View>
            </KeyboardAwareScrollView>

            <View style={styles.setButton}>
              <Button
                title={"수정하기"}
                disabled={isQuantityZero}
                onPress={() => {
                  updateDiet();
                }}
              />
            </View>
          </>
        )}
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
  },
  foodTitle: {
    fontWeight: "700",
    fontSize: 30,
    position: "absolute",
    top: "5%",
  },
  foodCalorie: {
    color: "#999999",
    fontSize: 18,
    position: "absolute",
    top: "11%",
    fontWeight: "700",
  },
  mainNutrient: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "20%",
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  editWindow: {
    flex: 1,
    position: "absolute",
    top: "30%",
    width: "100%",
    paddingHorizontal: 30,
  },
  setButton: {
    alignItems: "center",
    position: "absolute",
    top: "73%",
    paddingVertical: 20,
  },
});

export default DietDetailScreen;
