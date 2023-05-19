import {
  Pressable,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const SELECTIMAGE = {
  FEMALE: require('../../assets/female.png'),
};

const GenderButton = ({ onSelectGender }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    onSelectGender(gender);
  };

  return (
    <View style={styles.genderButtonContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={[
            styles.genderButton,
            selectedGender === 'male' && {
              borderColor: '#0091FF',
              borderWidth: 1,
            },
          ]}
          onPress={() => handleGenderSelection('male')}
        >
          <Image
            source={require('../../assets/male.png')}
            style={{
              width: 90,
              height: 120,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Text style={{ color: '#666666', fontSize: 20 }}>남성</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={[
            styles.genderButton,
            selectedGender === 'female' && {
              borderColor: '#0091FF',
              borderWidth: 1,
            },
          ]}
          onPress={() => handleGenderSelection('female')}
        >
          <Image
            source={require('../../assets/female.png')}
            style={{
              width: 90,
              height: 120,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Text style={{ color: '#666666', fontSize: 20 }}>여성</Text>
      </View>
    </View>
  );
};

GenderButton.propTypes = {
  onSelectGender: PropTypes.func,
};

const styles = StyleSheet.create({
  genderButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25,
    left: Dimensions.get('window').width * 0.06,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.25,
    backgroundColor: '#fff',
  },
  genderButton: {
    width: Dimensions.get('window').height * 0.19,
    height: Dimensions.get('window').height * 0.19,
    borderWidth: 0.1,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedButton: {
    borderColor: '#0091FF',
  },
});

export default GenderButton;
