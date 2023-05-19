import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import SummaryButton, {
  TITLE,
  SUBTITLE,
  IMAGE,
} from '../../components/SummaryButton';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../store/auth-context';
import { useContext, useState, useEffect } from 'react';
import { getUserName } from '../../api/userInfo';

const SettingMainScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userName = await getUserName(authContext.token);
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUserName();
  }, [authContext.token]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.setting}
          source={require('../../../assets/SettingMain.png')}
        />
      </View>

      <View style={styles.menu}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: '5%',
            left: '10%',
          }}
        >
          <Text
            style={{
              color: '#AD94F7',
              fontWeight: '700',
              fontSize: 20,
              marginRight: 10,
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,
              position: 'relative',
            }}
          >
            님
          </Text>
        </View>

        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            position: 'absolute',
            top: '10%',
            left: '10%',
          }}
        >
          튼튼하고 건강하게만 자라다오!
        </Text>
        <View style={{ position: 'absolute', top: '20%' }}>
          <SummaryButton
            title={TITLE.INFO}
            subTitle={SUBTITLE.INFO}
            imageRoute={IMAGE.INFO}
            onPress={() => navigation.navigate('SettingInfo')}
          />
        </View>
        <View style={{ position: 'absolute', top: '50%' }}>
          <SummaryButton
            title={TITLE.PUSH}
            subTitle={SUBTITLE.PUSH}
            imageRoute={IMAGE.PUSH}
            onPress={() => navigation.navigate('SettingPush')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: '50%',
    backgroundColor: '#AD94F7',
    alignItems: 'center',
  },
  setting: {
    position: 'absolute',
    top: '10%',
  },
  menu: {
    position: 'absolute',
    top: '20%',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F8F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingMainScreen;
