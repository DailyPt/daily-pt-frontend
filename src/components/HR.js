import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const HR = ({ text }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <View style={styles.line} />
      <Text style={{ color: '#D1D5DB' }}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

HR.propTypes = {
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  line: {
    borderTopWidth: 0.5,
    borderTopColor: '#D1D5DB',
    width: '35%',
    margin: 7.5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default HR;
