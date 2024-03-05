import React, {useRef, useState} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  GestureResponderEvent,
  View,
} from 'react-native';

interface MyButtonProps {
  color?: string;
  rippleColor?: string;
  type?: 'primary' | 'noborder';
  children?: React.ReactNode;
  width?: number;
  height?: number;
  radius?: number;
  onPress?: (e: GestureResponderEvent) => void;
  paddingHorizontal?: number;
  paddingVertical?: number;
  buttonStyle?: object;
}

const MyButton: React.FC<MyButtonProps> = ({
  color,
  rippleColor,
  type,
  children,
  width,
  height,
  radius,
  onPress,
  paddingHorizontal = 14,
  paddingVertical = 10,
  buttonStyle,
}) => {
  const shadowAnim = useRef(new Animated.Value(5)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  let buttonRef = useRef<View>(null);
  const [rippleX, setRippleX] = useState<number>(0);
  const [rippleY, setRippleY] = useState<number>(0);
  const [rippleSize, setRippleSize] = useState<number>(0);

  // console.log('button render');

  const shadowIn = (e: GestureResponderEvent) => {
    onPress && onPress(e);
    showRipple(e);
    Animated.timing(rippleAnim, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rippleAnim.setValue(0);
    });
    Animated.timing(shadowAnim, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(shadowAnim, {
        toValue: 5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const showRipple = (e: GestureResponderEvent) => {
    const pageX = e.nativeEvent.pageX;
    const pageY = e.nativeEvent.pageY;

    if (buttonRef.current) {
      buttonRef.current.measure(
        (x, y, buttonWidth, buttonHeight, left, top) => {
          const newRippleSize =
            buttonWidth > buttonHeight ? buttonWidth : buttonHeight;
          setRippleSize(newRippleSize);
          setRippleX(pageX - left - rippleSize / 2);
          setRippleY(pageY - top - rippleSize / 2);
        },
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={shadowIn} id="hello">
        <Animated.View
          ref={buttonRef}
          style={[
            styles.button,
            buttonStyle,
            {
              paddingHorizontal: paddingHorizontal,
              paddingVertical: paddingVertical,
              borderRadius: radius,
              backgroundColor: color,
              elevation: shadowAnim,
              width: width,
              height: height,
              transform: [
                {
                  scale: shadowAnim.interpolate({
                    inputRange: [2, 5],
                    outputRange: [0.99, 1],
                  }),
                },
              ],
            },
            type === 'noborder' ? styles.noBorder : null,
          ]}>
          <View style={styles.childrenContainer}>{children}</View>
          <Animated.View
            style={[
              styles.ripple,
              {
                backgroundColor: rippleColor,
                left: rippleX,
                top: rippleY,
                width: rippleSize,
                height: rippleSize,
                borderRadius: rippleSize * 0.5,
                transform: [{scale: rippleAnim}],
                opacity: rippleAnim.interpolate({
                  inputRange: [0, 2],
                  outputRange: [0.5, 0],
                }),
              },
            ]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  noBorder: {
    elevation: 0,
  },
  ripple: {
    position: 'absolute',
    transformOrigin: 'center',
    zIndex: 1,
  },
  childrenContainer: {
    zIndex: 2,
  },
});

export default MyButton;
