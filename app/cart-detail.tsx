import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useProductsStore, { Product } from '@/stores/useProductsStore';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function CartDetail() {
    const params = useLocalSearchParams();
    const { products } = useProductsStore()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        if (params?.id) {
            const productSelected = products.find(p => p.id === Number(params?.id))
            if (productSelected)
                setProduct(productSelected)
        }
    }, [params?.id, products])

    return (
        <>
            <Stack.Screen options={{ title: 'hihi' }} />
            <ThemedView style={styles.container}>
                <ThemedText>hi</ThemedText>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
})