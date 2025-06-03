import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import useProductsStore from '@/stores/useProductsStore';
import { useRouter } from 'expo-router';

const CartHeader: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
    const { navigate, canGoBack, back } = useRouter()
    const tintColor = useThemeColor('tint')
    const backgroundColor = useThemeColor('background')
    const { productsSelected } = useProductsStore()
    const totalQuantity = useMemo(() => productsSelected.reduce((preValue, currentValue) => preValue + currentValue.quantity, 0), [productsSelected])
    const animatedValue = useRef(new Animated.Value(0)).current

    const handlePressCart = useCallback(() => {
        if(canGoBack()) back()
        navigate('/cart')
    }, [back, canGoBack, navigate])

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start(() => animatedValue.setValue(0))
    }, [animatedValue, totalQuantity])

    const scaleItem = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1],
    });

    return (
        <Pressable onPress={handlePressCart}>
            <ThemedView style={[styles.container, style]}>
                <IconSymbol size={30} name="cart" color={tintColor} />
                {totalQuantity > 0 &&
                    <Animated.View style={[styles.countContainer, { transform: [{ scale: scaleItem }] }]}>
                        <ThemedView style={[styles.countBackground, { backgroundColor: tintColor }]}>
                            <ThemedText style={{ color: backgroundColor }} type='small'>{totalQuantity}</ThemedText>
                        </ThemedView>
                    </Animated.View>}
            </ThemedView>
        </Pressable>
    )
}
export default memo(CartHeader)
const styles = StyleSheet.create({
    container: {
        marginRight: 16,
    },
    countContainer: {
        position: 'absolute',
        right: -10,
        top: -4,
    },
    countBackground: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})