import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import NutrientDetailScreen from './NutrientDetailScreen';

const DailyNutrientDetailScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const renderScreen = (date) => {
    if (!Date.parse(date)) {
      return <View />;
    }

    const dt = new Date(date);
    const newDate =
      dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    // console.log(date);
    return <NutrientDetailScreen title={newDate} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <CalendarStrip
        scrollable={true}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        showMonth={false}
        style={[styles.calendar]}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 300,
          highlightColor: '#fff',
        }}
        calendarColor={'#AD94F7'}
        calendarHeaderStyle={{ color: '#fff' }}
        dateNumberStyle={{ color: '#fff' }}
        dateNameStyle={{ color: '#fff' }}
        highlightDateNumberStyle={{ color: '#AD94F7' }}
        highlightDateNameStyle={{ color: '#AD94F7' }}
        iconContainer={{ flex: 0.1 }}
      />
      {renderScreen(selectedDate)}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 100,
    paddingBottom: 5,
    borderColor: '#AD94F7',
  },
});

export default DailyNutrientDetailScreen;
