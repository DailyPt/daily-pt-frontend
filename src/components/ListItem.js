import { View, Text, StyleSheet, Pressable } from 'react-native';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ListItem = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.food}>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </View>

      <Pressable onPress={() => {}} hitSlop={10}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={20}
          color={'#8B5CF6'}
        />
      </Pressable>
    </View>
  );
});

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
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
    flexDirection: 'row',
  },

  food: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ListItem;
