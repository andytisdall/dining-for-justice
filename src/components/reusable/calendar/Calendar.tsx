import {Text, View, PanResponder, Animated, Dimensions} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {format, utcToZonedTime} from 'date-fns-tz';
import {
  startOfMonth,
  getDaysInMonth,
  addDays,
  getDay,
  subMonths,
  addMonths,
} from 'date-fns';

import DayNames from './DayNames';
import CalendarHeader from './CalendarHeader';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Calendar = ({
  renderItems,
}: {
  renderItems: (day: string) => React.JSX.Element;
}) => {
  const [month, setMonth] = useState(new Date());

  const translateValue = useRef(new Animated.Value(0)).current;

  const springBack = Animated.spring(translateValue, {
    toValue: 0,
    useNativeDriver: true,
  });

  const monthTransition = (action: 'add' | 'sub' | 'today') => {
    if (action === 'add') {
      Animated.timing(translateValue, {
        toValue: -SCREEN_WIDTH,
        useNativeDriver: true,
        duration: 100,
      }).start(() => {
        translateValue.setValue(200);
        setMonth(current => addMonths(current, 1));
        springBack.start();
      });
    } else if (action === 'sub') {
      Animated.timing(translateValue, {
        toValue: SCREEN_WIDTH,
        useNativeDriver: true,
        duration: 100,
      }).start(() => {
        translateValue.setValue(-200);
        setMonth(current => subMonths(current, 1));
        springBack.start();
      });
    } else {
      if (format(month, 'M') === format(new Date(), 'M')) {
        return;
      }
      if (month > new Date()) {
        monthTransition('sub');
      }

      if (month < new Date()) {
        monthTransition('add');
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderEnd: (event, gesture) => {
        if (gesture.dx < -150) {
          monthTransition('add');
        } else if (gesture.dx > 150) {
          monthTransition('sub');
        } else {
          springBack.start();
        }
      },
      onPanResponderMove: (event, gesture) => {
        translateValue.setValue(gesture.dx);
      },
    }),
  ).current;

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = startOfMonth(month);
    const dayOfWeek = getDay(firstDay);
    for (let i = 0; i < dayOfWeek; i++) {
      days.push(null);
    }
    const numberOfDays = getDaysInMonth(month);
    for (let i = 0; i < numberOfDays; i++) {
      const date = addDays(firstDay, i);

      days.push(
        format(utcToZonedTime(date, 'America/Los_Angeles'), 'yyyy-MM-dd'),
      );
    }
    return days.map((d, i) => {
      if (!d) {
        return <View style={styles.blankDate} key={i} />;
      }
      const items = renderItems(d);

      return (
        <View style={styles.calendarDate} key={d}>
          <View style={styles.calendarDateBackground}>
            <View style={styles.calendarDateNumberContainer}>
              <Text style={styles.calendarDateNumber}>
                {format(utcToZonedTime(d, 'America/Los_Angeles'), 'd')}
              </Text>
            </View>
            {items}
          </View>
        </View>
      );
    });
  }, [month, renderItems]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.calendarScreen,
        {
          transform: [{translateX: translateValue}],
        },
      ]}>
      <CalendarHeader month={month} changeMonth={monthTransition} />
      <DayNames />
      <View style={[styles.calendar]}>{getDays()}</View>
    </Animated.View>
  );
};

export default Calendar;
