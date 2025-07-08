import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const getInitial = (name: string) => {
  if (!name) return '';
  return name.trim().charAt(0).toUpperCase();
};

const getRandomColor = () => {
  // Generates a random pastel color
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 40,
  backgroundColor,
  color = '#fff',
  style,
  textStyle,
}) => {
  const initial = getInitial(name);
  const randomColor = React.useMemo(() => getRandomColor(), [name]);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor || randomColor,
        },
        style,
      ]}
      accessible
      accessibilityLabel={`Avatar for ${name}`}
    >
      <Text
        style={[
          styles.text,
          {
            color,
            fontSize: size * 0.5,
          },
          textStyle,
        ]}
      >
        {initial}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default Avatar;
