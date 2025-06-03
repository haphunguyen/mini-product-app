import React, { memo } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Product } from '@/stores/useProductsStore';
import { Rating } from '@kolking/react-native-rating';

const ProductCard: React.FC<{ item: Product, index: number , onPress: () => void, testID?: string}> = ({ item, onPress, testID }) => {
    return (
        <Pressable testID={`${testID}`} style={styles.container} onPress={onPress}>
            <Image
                testID={`${testID}-image`}
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode={'contain'} />
            <ThemedView style={styles.infoContainer}>
                <ThemedText testID={`${testID}-price`} style={styles.price} type='subtitle'>${item.price}</ThemedText>
                <ThemedText testID={`${testID}-title`} style={{ flex: 1 }} type='defaultSemiBold' numberOfLines={2}>{item.title}</ThemedText>
                <ThemedView style={styles.ratingContainer}>
                    <Rating testID={`${testID}-rating`} variant={'stars'} size={16} rating={item.rating.rate} />
                    <ThemedText testID={`${testID}-rating-value`} style={{ color: Colors.light.tabIconDefault }}>({item.rating.rate})</ThemedText>
                </ThemedView>
            </ThemedView>
        </Pressable>
    )
}
export default memo(ProductCard)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        padding: 12,
        rowGap: 16,
        borderWidth: 0.5,
        borderColor: Colors.light.icon,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
    },
    price: {
        textAlign: 'right',
        marginBottom: 4,
    },
    infoContainer: {
        gap: 4,
    },
})