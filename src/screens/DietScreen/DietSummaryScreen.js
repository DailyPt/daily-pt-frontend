/* eslint-disable react/prop-types */
import { View, Text, StyleSheet } from 'react-native';
import SummaryButton, {
  TITLE,
  SUBTITLE,
  IMAGE,
} from '../../components/SummaryButton';
import { useNavigation } from '@react-navigation/native';

const DietSummaryScreen = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.calorie}>
        <SummaryButton
          title={TITLE.CALORIES}
          subTitle={SUBTITLE.CALORIES}
          imageRoute={IMAGE.CALORIES}
        />
      </View>
      <View style={styles.record}>
        <SummaryButton
          title={TITLE.RECORD}
          subTitle={SUBTITLE.RECORD}
          imageRoute={IMAGE.RECORD}
          onPress={() => navigation.navigate('DietDetail')}
        />
      </View>

      <Text>Diet Summary for {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
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
  calorie: {
    position: 'absolute',
    top: '5%',
    marginBottom: 20,
  },
  record: {
    position: 'relative',
    marginBottom: 20,
  },
});

export default DietSummaryScreen;
