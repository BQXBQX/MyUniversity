import React, {useRef} from 'react';
import {StyleSheet, Animated, GestureResponderEvent} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyButton from '../button';
import {colors} from '../../../colors';

interface MyCardProps {
  width?: number;
  height?: number;
  radius?: number;
  rippleColor?: string;
  gradientColor?: string;
  startColor: string;
  endColor: string;
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  cardStyle?: object;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

const MyCard: React.FC<MyCardProps> = ({
  width,
  height,
  radius,
  rippleColor,
  startColor = colors.accent200,
  endColor = colors.accent200,
  start = {x: 1, y: 1},
  end = {x: 1, y: 1},
  children,
  onPress,
  cardStyle,
  paddingHorizontal = 14,
  paddingVertical = 10,
}) => {
  const shadowAnim = useRef(new Animated.Value(4)).current;

  // console.log('card render');

  const shadowIn = (e: GestureResponderEvent) => {
    onPress && onPress(e);
    Animated.timing(shadowAnim, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(shadowAnim, {
        toValue: 3,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View
      style={[
        cardStyle,
        {
          elevation: shadowAnim,
          width: width,
          height: height,
          borderRadius: radius,
          transform: [
            {
              scale: shadowAnim.interpolate({
                inputRange: [2, 5],
                outputRange: [0.99, 1],
              }),
            },
          ],
        },
      ]}>
      <LinearGradient
        style={[
          styles.background,
          {
            width: width,
            height: height,
            borderRadius: radius,
          },
        ]}
        colors={[startColor, endColor]}
        start={start}
        end={end}>
        <MyButton
          type="noborder"
          rippleColor={rippleColor}
          width={width}
          height={height}
          onPress={shadowIn}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
          radius={radius}>
          {children}
        </MyButton>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {},
});
export default MyCard;
