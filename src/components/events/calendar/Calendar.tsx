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

import {sizeMultiplier} from '../../styles/baseStyles';
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
  }).start;

  const springRight = Animated.timing(translateValue, {
    toValue: SCREEN_WIDTH,
    useNativeDriver: true,
    duration: 100,
  }).start;

  const springLeft = Animated.timing(translateValue, {
    toValue: -SCREEN_WIDTH,
    useNativeDriver: true,
    duration: 100,
  }).start;

  const changeMonth = useCallback(
    (action: 'add' | 'sub' | 'reset') => {
      switch (action) {
        case 'add':
          springLeft(() => {
            setMonth(currentMonth => addMonths(currentMonth, 1));
            translateValue.setValue(200);
            springBack();
          });
          break;
        case 'sub':
          springRight(() => {
            setMonth(currentMonth => subMonths(currentMonth, 1));
            translateValue.setValue(-200);
            springBack();
          });

          break;
        case 'reset':
          setMonth(currentMonth => {
            const today = new Date();
            if (format(currentMonth, 'M') === format(today, 'M')) {
              return today;
            }
            if (today < month) {
              springRight(() => {
                translateValue.setValue(-200);
                springBack();
              });
            } else {
              springLeft(() => {
                translateValue.setValue(200);
                springBack();
              });
            }
            return today;
          });
          break;
        default:
          break;
      }
    },
    [month, springBack, translateValue, springLeft, springRight],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (e, gesture) =>
        gesture.dx !== 0 && gesture.dy !== 0,
      onPanResponderEnd: (event, gesture) => {
        if (gesture.dx < -100 * sizeMultiplier) {
          changeMonth('add');
        } else if (gesture.dx > 100 * sizeMultiplier) {
          changeMonth('sub');
        } else {
          springBack();
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
        {
          transform: [{translateX: translateValue}],
        },
      ]}>
      <CalendarHeader month={month} changeMonth={changeMonth} />
      <DayNames />
      <View style={[styles.calendar]}>{getDays()}</View>
    </Animated.View>
  );
};

export default Calendar;
