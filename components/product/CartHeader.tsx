import React, { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const CartHeader: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
    const tintColor = useThemeColor('tint')
    const backgroundColor = useThemeColor('background')
    return (
        <ThemedView style={[styles.container, style]}>
            <IconSymbol size={30} name="cart" color={tintColor} />
            <ThemedView style={styles.count}>
                <ThemedText style={{ color: backgroundColor }} type='small'>99</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}
export default memo(CartHeader)
const styles = StyleSheet.create({
    container: {
        marginRight: 16,
    },
    count: {
        position: 'absolute',
        backgroundColor: Colors.light.tint,
        aspectRatio: 1,
        borderRadius: 100,
        width: 20,
        right: -10,
        top: -4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})