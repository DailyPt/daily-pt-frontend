import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useState, useContext, useEffect } from "react";
import { getUserInfo, modifyUserInfo } from "../../api/userInfo";
import SettingInput, {
  keyBoardType,
  ReturnKeyTypes,
} from "../../components/SettingInput";
import SignInButton from "../../components/SignInButton";
import SafeInputView from "../../components/SafeInputView";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SettingInfoScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [prevUserName, setPrevUserName] = useState();
  const [userName, setUserName] = useState();
  // const [prevUserBirth, setPrevUserBirth] = useState();
  const [userBirth, setUserBirth] = useState();
  const [prevUserHeight, setPrevUserHeight] = useState();
  const [userHeight, setUserHeight] = useState();
  const [prevUserWeight, setPrevUserWeight] = useState();
  const [userWeight, setUserWeight] = useState();
  const [prevUserGender, setPrevUserGender] = useState();
  const [userGender, setUserGender] = useState();

  const prevUserBirth = "1999/02/25";

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const receivedInfo = await getUserInfo(authContext.token);

        // const dateString = receivedInfo.birth;
        // const parts = dateString.split("/");
        // const year = parseInt(parts[0], 10);
        // const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are 0-based (0 - 11)
        // const day = parseInt(parts[2], 10);

        // const dateObject = new Date(year, month, day);

        // setPrevUserBirth(dateObject);
        setPrevUserName(receivedInfo.name);
        setPrevUserHeight(receivedInfo.height.toString());
        setPrevUserWeight(receivedInfo.weight.toString());

        if (receivedInfo.gender === "male") {
          setPrevUserGender("남성");
        } else {
          setPrevUserGender("여성");
        }
      } catch (error) {
        console.error("Error fetching userInfo:", error);
      }
    };

    fetchUserInfo();
  }, [authContext.token]);

  const updateUserInfo = async () => {
    if (isFormDirty) {
      const newUserInfo = {
        name: userName || prevUserName,
        birth: userBirth || prevUserBirth,
        height: parseFloat(userHeight) || parseFloat(prevUserHeight),
        weight: parseFloat(userWeight) || parseFloat(prevUserWeight),
        gender: (userGender === "남성" ? "male" : "female") || prevUserGender,
      };

      console.log(newUserInfo);

      await modifyUserInfo(authContext.token, newUserInfo);
    }
    navigation.navigate("Main");
  };

  useEffect(() => {
    setDisabled(
      !isFormDirty ||
        (!prevUserName && !userName) ||
        (!prevUserBirth && !userBirth) ||
        (!prevUserHeight && !userHeight) ||
        (!prevUserWeight && !userWeight) ||
        (!prevUserGender && !userGender)
    );
  }, [
    isFormDirty,
    prevUserName,
    userName,
    prevUserBirth,
    userBirth,
    prevUserHeight,
    userHeight,
    prevUserWeight,
    userWeight,
    prevUserGender,
    userGender,
  ]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setUserName(enteredValue);
        break;
      case "birth":
        setUserBirth(enteredValue);
        break;
      case "height":
        setUserHeight(enteredValue);
        break;
      case "weight":
        setUserWeight(enteredValue);
        break;
      case "gender":
        setUserGender(enteredValue);
        break;
    }

    setIsFormDirty(true);
  }

  return (
    <SafeInputView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.edit}
            source={require("../../../assets/SettingEdit.png")}
          />
        </View>
        <KeyboardAwareScrollView style={styles.editWindow}>
          <View style={styles.editInput}>
            <Text style={styles.editTitle}>이름</Text>
            <SettingInput
              title={"이름"}
              placeholder={prevUserName}
              keyboardType={keyBoardType.DEFAULT}
              returnKeyType={ReturnKeyTypes.NEXT}
              textContentType={"name"}
              value={userName}
              onChangeText={updateInputValueHandler.bind(this, "name")}
            />
          </View>

          <View style={styles.editInput}>
            <Text style={styles.editTitle}>생일</Text>
            <SettingInput
              title={"생일"}
              placeholder={prevUserBirth}
              keyBoardType={keyBoardType.DEFAULT}
              returnKeyType={ReturnKeyTypes.NEXT}
              textContentType={"none"}
              value={userBirth}
              onChangeText={updateInputValueHandler.bind(this, "birth")}
            />
          </View>

          <View style={styles.editInput}>
            <Text style={styles.editTitle}>신장</Text>
            <SettingInput
              title={"신장"}
              placeholder={`${prevUserHeight} cm`}
              keyBoardType={keyBoardType.NUMBER}
              returnKeyType={ReturnKeyTypes.NEXT}
              textContentType={"none"}
              value={userHeight}
              onChangeText={updateInputValueHandler.bind(this, "height")}
            />
          </View>

          <View style={styles.editInput}>
            <Text style={styles.editTitle}>체중</Text>
            <SettingInput
              title={"체중"}
              placeholder={`${prevUserWeight} kg`}
              keyBoardType={keyBoardType.NUMBER}
              returnKeyType={ReturnKeyTypes.NEXT}
              textContentType={"none"}
              value={userWeight}
              onChangeText={updateInputValueHandler.bind(this, "weight")}
            />
          </View>

          <View style={styles.editInput}>
            <Text style={styles.editTitle}>성별</Text>
            <SettingInput
              title={"성별"}
              placeholder={prevUserGender}
              keyboardType={keyBoardType.DEFAULT}
              returnKeyType={ReturnKeyTypes.DONE}
              textContentType={"none"}
              value={userGender}
              onChangeText={updateInputValueHandler.bind(this, "gender")}
            />
          </View>
          <SignInButton
            title="저장"
            onPress={() => updateUserInfo()}
            disabled={disabled}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeInputView>
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
  edit: {
    position: "absolute",
    top: "7%",
    width: 100,
    height: 100,
  },
  editWindow: {
    position: "absolute",
    top: "20%",
    width: "100%",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    padding: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F8F8FA",
  },
  editInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default SettingInfoScreen;
