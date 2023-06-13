import { Dimensions, Pressable, StyleSheet, Text, Image } from "react-native";
import PropTypes from "prop-types";

export const SUBTITLE = {
  CALORIES: "오늘은 얼마나 먹었을까?",
  RECORD: "식단 기록을 확인하세요!",
  INFO: "그동안 달라진 정보가 있으신가요?",
  PUSH: "영양제를 관리할 수 있도록",
  LIST: "어떤 영양제를 드시고 계신가요?",

  NUT_STAT: "오늘은 얼마나 먹었을까?",
};

export const TITLE = {
  CALORIES: "0 kcal", // refer to bmi from server
  RECORD: "식단 기록",
  INFO: "내 정보 수정",
  PUSH: "알림 설정",
  LIST: "복용 중인 영양제",

  NUT_STAT: "영양제 통계",
};

export const IMAGE = {
  CALORIES: require("../../assets/Summary_Calories.png"),
  RECORD: require("../../assets/Summary_Record.png"),
  INFO: require("../../assets/SettingMainEdit.png"),
  PUSH: require("../../assets/SettingMainAlarm.png"),
  NUT_STAT: require("../../assets/NutrientSummaryCheck.png"),
  LIST: require("../../assets/NutrientSummaryList.png"),
};

const SummaryButton = ({ title, subTitle, onPress, imageRoute }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={imageRoute} />
    </Pressable>
  );
};

SummaryButton.propTypes = {
  title: PropTypes.oneOf(Object.values(TITLE)).isRequired,
  subTitle: PropTypes.oneOf(Object.values(SUBTITLE)).isRequired,
  onPress: PropTypes.func,
  imageRoute: PropTypes.oneOf(Object.values(IMAGE)),
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width * 0.88,
    height: Dimensions.get("window").height * 0.2,
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
    fontSize: 12,
    position: "absolute",
    top: "15%",
    left: "10%",
  },

  image: {
    width: Dimensions.get("window").width * 0.25,
    height: Dimensions.get("window").width * 0.25,
    position: "absolute",
    top: "20%",
    right: "5%",
  },
});

export default SummaryButton;
