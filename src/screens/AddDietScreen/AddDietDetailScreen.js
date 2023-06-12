import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

const HR = () => {
  return (
    <View
      style={{
        width: "100%",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
      }}
    />
  );
};

const AddDietDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { image, food } = route.params;
  console.log(food);
  console.log(image);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={styles.foodTitle}>{food.descKor}</Text>
          <Text style={styles.foodCalorie}>{food.foodGroup}</Text>

          {food.makerName === "" ? null : (
            <Text style={styles.foodCalorie}>제조사 : {food.makerName}</Text>
          )}
          <View
            style={{
              width: "100%",
              borderColor: "#E6E6E6",
              borderWidth: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: 10,
            }}
          />
        </View>
        <View>
          <View style={styles.nutrient}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>열량</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.kcal) ? "0" : `${food.kcal}`} kcal
            </Text>
          </View>
          <HR />
          <View style={styles.nutrient}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>탄수화물</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.carbohydrate) ? "0" : `${food.carbohydrate}`} g
            </Text>
          </View>

          <HR />
          <View style={styles.nutrient}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>지방</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.fat) ? "0" : `${food.fat}`} g
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 10,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                left: 40,
                fontSize: 20,
                fontWeight: "700",
                color: "#666666",
              }}
            >
              포화지방
            </Text>
            <Text
              style={{
                position: "absolute",
                right: 20,
                fontSize: 20,
                fontWeight: "600",
                color: "#666666",
              }}
            >
              {isNaN(food.saturatedFat) ? "0" : `${food.saturatedFat}`} g
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                left: 40,
                fontSize: 20,
                fontWeight: "700",
                color: "#666666",
              }}
            >
              트랜스지방
            </Text>
            <Text
              style={{
                position: "absolute",
                right: 20,
                fontSize: 20,
                fontWeight: "600",
                color: "#666666",
              }}
            >
              {isNaN(food.transFat) ? "0" : `${food.transFat}`} g
            </Text>
          </View>

          <HR />
          <View style={styles.nutrient}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>당류</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.sugar) ? "0" : `${food.sugar}`} g
            </Text>
          </View>

          <HR />
          <View style={styles.nutrient}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>나트륨</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.sodium) ? "0" : `${food.sodium}`} mg
            </Text>
          </View>

          <HR />
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginBottom: 50,
              padding: 10,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700" }}>콜레스테롤</Text>
            <Text style={styles.nutrientQuantity}>
              {isNaN(food.cholesterol) ? "0" : `${food.cholesterol}`} mg
            </Text>
          </View>
        </View>
        <View>
          <Button
            title={"돌아가기"}
            onPress={() =>
              navigation.navigate("AddDietSetting", { image, food })
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
    padding: 20,
  },
  foodTitle: {
    fontWeight: "700",
    fontSize: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    marginVertical: 10,
  },
  foodCalorie: {
    color: "#999999",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginVertical: 10,
  },
  nutrient: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  nutrientQuantity: {
    position: "absolute",
    right: 20,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AddDietDetailScreen;
