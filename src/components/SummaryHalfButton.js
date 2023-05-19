import { Dimensions, Pressable, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

export const HALFSUBTITLE = {
  NUT_ALARM: '제 때 영양제를 먹어야죠!',
  NUT_LIST: '어떤 영양제를 먹고 있었지?',
};

export const HALFTITLE = {
  NUT_ALARM: '영양제 알림',
  NUT_LIST: '영양제 목록',
};

export const HALFIMAGE = {
  NUT_ALARM: require('../../assets/NutrientSummaryAlarm.png'),
  NUT_LIST: require('../../assets/NutrientSummaryList.png'),
};

const SummaryHalfButton = ({ title, subTitle, onPress, imageRoute }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={imageRoute} />
    </Pressable>
  );
};

SummaryHalfButton.propTypes = {
  title: PropTypes.oneOf(Object.values(HALFTITLE)).isRequired,
  subTitle: PropTypes.oneOf(Object.values(HALFSUBTITLE)).isRequired,
  onPress: PropTypes.func,
  imageRoute: PropTypes.oneOf(Object.values(HALFIMAGE)),
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').height * 0.2,
    height: Dimensions.get('window').height * 0.2,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
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
    color: '#222222',
    fontWeight: '700',
    fontSize: 20,
    position: 'absolute',
    top: '25%',
    left: '10%',
  },

  subTitle: {
    color: '#666666',
    fontWeight: '500',
    fontSize: 10,
    position: 'absolute',
    top: '12%',
    left: '10%',
  },

  image: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    position: 'absolute',
    bottom: '10%',
    right: '5%',
  },
});

export default SummaryHalfButton;
