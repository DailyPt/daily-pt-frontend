import { View, Image, StyleSheet, Dimensions } from 'react-native';
import SummaryButton, {
  TITLE,
  SUBTITLE,
  IMAGE,
} from '../../components/SummaryButton';
import SummaryHalfButton, {
  HALFSUBTITLE,
  HALFTITLE,
  HALFIMAGE,
} from '../../components/SummaryHalfButton';
import { useNavigation } from '@react-navigation/native';

const NutrientSummaryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.nutrient}
          source={require('../../../assets/NutrientSummary.png')}
        />
      </View>

      <View style={styles.menu}>
        <View style={{ position: 'absolute', top: '5%' }}>
          <SummaryButton
            title={TITLE.NUT_STAT}
            subTitle={SUBTITLE.NUT_STAT}
            imageRoute={IMAGE.NUT_STAT}
            onPress={() => navigation.navigate('NutrientDetail')}
          />
        </View>
        <View style={{ position: 'absolute', top: '37%', left: '5%' }}>
          <SummaryHalfButton
            title={HALFTITLE.NUT_ALARM}
            subTitle={HALFSUBTITLE.NUT_ALARM}
            imageRoute={HALFIMAGE.NUT_ALARM}
            onPress={() => navigation.navigate('NutrientDetail')}
          />
        </View>
        <View style={{ position: 'absolute', top: '37%', right: '5%' }}>
          <SummaryHalfButton
            title={HALFTITLE.NUT_LIST}
            subTitle={HALFSUBTITLE.NUT_LIST}
            imageRoute={HALFIMAGE.NUT_LIST}
            onPress={() => navigation.navigate('NutrientDetail')}
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
  nutrient: {
    position: 'absolute',
    top: '5%',
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

export default NutrientSummaryScreen;
