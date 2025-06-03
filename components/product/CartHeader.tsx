import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import useProductsStore from '@/stores/useProductsStore';
import { useRouter } from 'expo-router';

const CartHeader: React.FC<{ 
    style?: StyleProp<ViewStyle>,
    testID?: string 
}> = ({ style, testID }) => {
    const { navigate, canGoBack, back } = useRouter()
    const tintColor = useThemeColor('tint')
    const backgroundColor = useThemeColor('background')
    const { productsSelected } = useProductsStore()
    const totalQuantity = useMemo(() => productsSelected.reduce((preValue, currentValue) => preValue + currentValue.quantity, 0), [productsSelected])
    const animatedValue = useRef(new Animated.Value(0)).current

    const handlePressCart = useCallback(() => {
        if (canGoBack()) back()
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
        <Pressable testID={testID} onPress={handlePressCart}>
            <ThemedView testID={`${testID}-container`} style={[styles.container, style]}>
                {totalQuantity > 0 ?
                    <Animated.View testID={`${testID}-quantity-container`} style={{ transform: [{ scale: scaleItem }] }}>
                        <ThemedView testID={`${testID}-quantity-background`} style={[styles.countBackground, { backgroundColor: tintColor }]}>
                            <ThemedText testID={`${testID}-quantity-text`} style={{ color: backgroundColor }} type='small'>{totalQuantity}</ThemedText>
                        </ThemedView>
                    </Animated.View> :
                    <IconSymbol testID={`${testID}-cart-icon`} size={30} name="cart" color={tintColor} />
                }
            </ThemedView>
        </Pressable>
    )
}
export default memo(CartHeader)
const styles = StyleSheet.create({
    container: {
        marginRight: 16,
    },
    countBackground: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})