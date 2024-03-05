import React from 'react';
import Svg, {Path} from 'react-native-svg';
interface TabBarIconProps {
  routeName: string;
  focused: boolean;
  color?: string;
  size?: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  routeName,
  focused,
  color,
  size,
}) => {
  if (routeName === 'Home') {
    if (focused) {
      return (
        <>
          <Svg viewBox="0 0 1024 1024" width={size} height={size} fill={color}>
            <Path
              d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z"
              p-id="8544"
              fill={color}
            />
          </Svg>
        </>
      );
    } else {
      return (
        <>
          <Svg viewBox="0 0 1024 1024" width={size} height={size} fill={color}>
            <Path
              d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
              p-id="8698"
            />
          </Svg>
        </>
      );
    }
  }
  if (routeName === 'About') {
    if (focused) {
      return (
        <>
          <Svg viewBox="0 0 1024 1024" width={size} height={size} fill={color}>
            <Path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272z m-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
              p-id="14952"
            />
          </Svg>
        </>
      );
    } else {
      return (
        <>
          <Svg viewBox="0 0 1024 1024" width={size} height={size} fill={color}>
            <Path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              p-id="15106"
            />
            <Path
              d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
              p-id="15107"
            />
            <Path
              d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
              p-id="15108"
            />
          </Svg>
        </>
      );
    }
  }
};

export default TabBarIcon;
