import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const DayPicker = ({ title, selectedDays, onPress }) => {
  const isDaySelected = selectedDays.includes(title);

  const handlePress = () => {
    onPress(title);
  };

  return (
    <Pressable
      style={[styles.dayPicker, isDaySelected && styles.selectedDay]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.dayPickerText,
          isDaySelected && styles.selectedDayText,
          title === "일" && { color: "#f00" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayPicker: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#AD94F7",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dayPickerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  selectedDay: {
    backgroundColor: "#AD94F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDayText: {
    color: "#fff",
  },
});

export default DayPicker;
