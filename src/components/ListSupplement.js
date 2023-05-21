import { View, Text, StyleSheet, Pressable } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListSupplement = memo(({ item }) => {
  console.log(item.id);

  return (
    <View style={styles.container}>
      <View style={styles.food}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            paddingRight: 10,
          }}
        >
          {item.productName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#999999",
            marginTop: 15,
            paddingRight: 10,
          }}
        >
          {item.enterprise}
        </Text>
      </View>

      <Pressable onPress={() => {}} hitSlop={10}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={30}
          color={"#8B5CF6"}
        />
      </Pressable>
    </View>
  );
});

ListSupplement.displayName = "ListSupplement";

ListSupplement.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  food: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ListSupplement;
