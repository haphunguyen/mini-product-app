import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const Loading: React.FC = () => {
    const rotationValue = useRef(new Animated.Value(0)).current;
    const tintColor = useThemeColor('tint')

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotationValue, {
                toValue: 360,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [rotationValue]);

    const interpolatedRotation = rotationValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: interpolatedRotation }] }}>
            <ThemedView style={[styles.container, { borderColor: tintColor }]} />
        </Animated.View>
    )
}
export default memo(Loading)
const styles = StyleSheet.create({
    container: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 2,
        borderStyle: 'dotted',
    },
})