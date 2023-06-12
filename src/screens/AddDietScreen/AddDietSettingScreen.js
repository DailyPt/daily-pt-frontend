import { View, StyleSheet, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import SettingInput, {
  keyBoardType,
  ReturnKeyTypes,
} from "../../components/SettingInput";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import NumericInput from "react-native-numeric-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddDietSettingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { image, food } = route.params;

  console.log(image);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setSelectedDate(currentDate);
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

  const dietRecord = new FormData();
  dietRecord.append("photo", image);
  dietRecord.append("foodId", String(food.id));
  if (memo !== "") {
    dietRecord.append("memo", memo);
  } else {
    dietRecord.append("memo", " ");
  }
  dietRecord.append("rating", String(ratingValue));
  dietRecord.append("quantity", String(quantity));

  const options = {
    timeZone: "Asia/Seoul",
    hour12: false,
  };

  dietRecord.append("date", selectedDate.toLocaleString("en-US", options));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <Text style={styles.foodTitle}>{food.descKor}</Text>
        <Text style={styles.foodCalorie}>{food.kcal} kcal</Text>
        <View style={styles.mainNutrient}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#C084FC",
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Text
                style={{ color: "#666666", fontSize: 20, fontWeight: "700" }}
              >
                탄수화물
              </Text>
            </View>
            <Text style={{ color: "#222222", fontSize: 18, fontWeight: "700" }}>
              {isNaN(food.carbohydrate) ? "0" : `${food.carbohydrate}`} g
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#8B5CF6",
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Text
                style={{ color: "#666666", fontSize: 20, fontWeight: "700" }}
              >
                단백질
              </Text>
            </View>
            <Text style={{ color: "#222222", fontSize: 18, fontWeight: "700" }}>
              {isNaN(food.protein) ? "0" : `${food.protein}`} g
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#A855F7",
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Text
                style={{ color: "#666666", fontSize: 20, fontWeight: "700" }}
              >
                지방
              </Text>
            </View>
            <Text style={{ color: "#222222", fontSize: 18, fontWeight: "700" }}>
              {isNaN(food.fat) ? "0" : `${food.fat}`} g
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            top: "30%",
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
            <Text style={{ fontWeight: "700", position: "absolute", top: 0 }}>
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
          <View
            style={{
              width: "100%",
              borderColor: "#E6E6E6",
              borderWidth: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Pressable
            style={{ margin: 15 }}
            onPress={() =>
              navigation.navigate("AddDietDetail", { image, food })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#666666" }}>
              자세한 영양정보
            </Text>
          </Pressable>
          <Button
            title={"수정하기"}
            onPress={() =>
              navigation.navigate("AddDietRecord", {
                food,
                dietRecord,
              })
            }
          />
        </View>
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
    top: "35%",
    width: "100%",
    paddingHorizontal: 30,
  },
  setButton: {
    alignItems: "center",
    position: "absolute",
    top: "80%",
    paddingVertical: 20,
  },
});

export default AddDietSettingScreen;
