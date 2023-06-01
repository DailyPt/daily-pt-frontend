import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";

const AddNutrientDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { supplement } = route.params;
  console.log(supplement.enterprise);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={styles.foodTitle}>{supplement.productName}</Text>
          {supplement.enterprise === null ? null : (
            <Text style={styles.foodCalorie}>
              제조사 : {supplement.enterprise}
            </Text>
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

        <ScrollView>
          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 20, marginVertical: 10 }}
            >
              효능
            </Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.mainFunc}
            </Text>
          </View>

          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 20, marginVertical: 10 }}
            >
              복용방법
            </Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.srvUse}
            </Text>
          </View>

          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>성상</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.baseStd}
            </Text>
          </View>

          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>유통기한</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.distbPd}
            </Text>
          </View>

          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              섭취 시 주의사항
            </Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.intakeHint}
            </Text>
          </View>

          <View style={{ width: "100%", padding: 5, marginVertical: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>보관방법</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {supplement.prsrvPd}
            </Text>
          </View>
        </ScrollView>

        <View>
          <Button
            title={"돌아가기"}
            onPress={() =>
              navigation.navigate("AddNutrientSetting", { supplement })
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
});

export default AddNutrientDetailScreen;
