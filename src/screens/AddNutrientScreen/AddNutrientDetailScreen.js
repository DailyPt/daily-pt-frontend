import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";

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

const AddNutrientDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { supplement } = route.params;
  console.log(supplement);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
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
});

export default AddNutrientDetailScreen;
