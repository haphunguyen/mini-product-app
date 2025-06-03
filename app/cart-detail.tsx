import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import CartHeader from '@/components/product/CartHeader';
import Loading from '@/components/product/Loading';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import useProductsStore, { Product } from '@/stores/useProductsStore';
import { Rating } from '@kolking/react-native-rating';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function CartDetail() {
    const params = useLocalSearchParams();
    const backgroundColor = useThemeColor('background')
    const tintColor = useThemeColor('tint')
    const { products, addProductToCart } = useProductsStore()
    const [product, setProduct] = useState<Product>()

    const handleAddProductToCart = useCallback(() => {
        if (product)
            addProductToCart(product)
    }, [addProductToCart, product])

    useEffect(() => {
        if (params?.id) {
            const productSelected = products.find(p => p.id === Number(params?.id))
            const timeOut = setTimeout(() => {
                if (productSelected)
                    setProduct(productSelected)
                clearTimeout(timeOut)
            }, 300);

        }
    }, [params?.id, products])

    return (
        <>
            <Stack.Screen options={{
                title: 'Product Detail',
                headerBackTitle: 'Back',
                headerRight: () => <CartHeader style={{ marginRight: 0 }} />,
            }} />
            {!product ? <ThemedView style={styles.loadingContainer}>
                <Loading />
            </ThemedView> : <ThemedView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ThemedView style={styles.scrollContainer}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.image}
                            resizeMode={'contain'} />
                        <ThemedText style={{ textAlign: 'right' }} type='title'>${product.price}</ThemedText>
                        <ThemedText type='subtitle'>{product.title}</ThemedText>
                        <ThemedText type='defaultSemiBold'>Category: {product.category}</ThemedText>
                        <ThemedText type='default'>{product.description}</ThemedText>
                        <ThemedView style={styles.ratingContainer}>
                            <Rating variant={'stars'} size={16} rating={product.rating.rate} />
                            <ThemedText style={{ color: Colors.light.tabIconDefault }}>({product.rating.rate})</ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ScrollView>
                <Pressable style={[styles.buttonAddToCard, {backgroundColor: tintColor}]} onPress={handleAddProductToCart}>
                    <ThemedText style={{ color: backgroundColor }} type='defaultSemiBold'>Add to Card</ThemedText>
                </Pressable>
                <SafeAreaView />
            </ThemedView>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        padding: 8,
        rowGap: 12,
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 8
    },
    ratingContainer: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
    },
    buttonAddToCard: {
        padding: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 4,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
})