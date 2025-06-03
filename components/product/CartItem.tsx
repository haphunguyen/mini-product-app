import React, { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useProductsStore, { Product } from '@/stores/useProductsStore';
const CartItem: React.FC<{ product: Product, quantity: number }> = ({ product, quantity }) => {
    const { updateQuantityProductSelected } = useProductsStore()

    const handleUpdateQuantity = useCallback((type: 'increase' | 'decrease') => {
        switch (type) {
            case 'increase':
                updateQuantityProductSelected(product.id, quantity + 1)
                break;
            case 'decrease':
                updateQuantityProductSelected(product.id, quantity - 1)
                break;
            default:
                break;
        }
    }, [product.id, quantity, updateQuantityProductSelected])

    return (
        <ThemedView style={styles.container}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode={'contain'} />
            <ThemedView style={{ flex: 1, justifyContent: 'space-around' }}>
                <ThemedText type={'defaultSemiBold'} numberOfLines={1}>{product.title}</ThemedText>
                <ThemedView style={styles.priceContainer}>
                    <ThemedText numberOfLines={1}>${product.price}</ThemedText>
                    <ThemedView style={styles.quantityContainer}>
                        <Pressable onPress={() => handleUpdateQuantity('decrease')}>
                            <ThemedView style={styles.quantityBox}>
                                <ThemedText >-</ThemedText>
                            </ThemedView>
                        </Pressable>
                        <ThemedView style={styles.quantityBox}>
                            <ThemedText type={'small'}>{quantity}</ThemedText>
                        </ThemedView>
                        <Pressable onPress={() => handleUpdateQuantity('increase')}>
                            <ThemedView style={styles.quantityBox}>
                                <ThemedText >+</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}
export default memo(CartItem)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        borderWidth: 0.25,
        borderRadius: 8,
        columnGap: 8,
    },
    image: {
        width: 80,
        aspectRatio: 1,
    },
    quantityBox: {
        borderWidth: 0.5,
        width: 24,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    quantityContainer: {
        flexDirection: 'row',
        rowGap: 2,
    }
})