import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = Omit<ImageProps, 'source'> & {
  source: ImageSourcePropType;
  defaultSource?: ImageSourcePropType;
};

const FallbackImage: React.FC<Props> = ({
  source,
  defaultSource,
  style,
  ...rest
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <Text style={styles.fallbackText}>No Image</Text>
      </View>
    );
  }

  return (
    <Image
      {...rest}
      style={style}
      source={source}
      onError={() => setError(true)}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#666',
    fontSize: 16,
  },
});

export default FallbackImage;
