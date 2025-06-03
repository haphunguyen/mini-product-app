import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const CategoryFilterButton: React.FC<{ 
    label: string, 
    onPress: () => void, 
    selected: boolean,
    testID?: string 
}> = ({ label, onPress, selected, testID }) => {
    return (
        <Pressable testID={testID} onPress={onPress}>
            <ThemedView testID={`${testID}-container`} style={[styles.container, selected && { backgroundColor: Colors.light.tabIconDefault }]}>
                <ThemedText testID={`${testID}-label`} style={{ color: selected ? Colors.light.background : Colors.light.text }}>{label}</ThemedText>
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