import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const CategoryFilterButton: React.FC<{ label: string, onPress: () => void, selected: boolean }> = ({ label, onPress, selected }) => {
    return (
        <Pressable onPress={onPress}>
            <ThemedView style={[styles.container, selected && { backgroundColor: Colors.light.tabIconDefault }]}>
                <ThemedText style={{ color: selected ? Colors.light.background : Colors.light.text }}>{label}</ThemedText>
            </ThemedView>
        </Pressable>
    )
}
export default memo(CategoryFilterButton)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        borderRadius: 8,
        borderWidth: 0.5,
    },
})