import { flatStyle } from '@/testHelper/styleHelper';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CategoryFilterButton from '../CategoryFilterButton';

describe('CategoryFilterButton Component', () => {
  const mockLabel = 'Test Category';
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when not selected', () => {
    const { getByTestId } = render(
      <CategoryFilterButton 
        label={mockLabel}
        onPress={mockOnPress}
        selected={false}
        testID="category-button"
      />
    );

    // Check if main container exists
    const container = getByTestId('category-button');
    expect(container).toBeTruthy();

    // Check if inner container exists
    const innerContainer = getByTestId('category-button-container');
    expect(innerContainer).toBeTruthy();

    // Check if label is rendered
    const label = getByTestId('category-button-label');
    expect(label.props.children).toBe(mockLabel);
  });

  it('renders correctly when selected', () => {
    const { getByTestId } = render(
      <CategoryFilterButton 
        label={mockLabel}
        onPress={mockOnPress}
        selected={true}
        testID="category-button"
      />
    );

    const container = getByTestId('category-button-container');
    expect(flatStyle(container.props.style)).toMatchObject({
      backgroundColor: expect.any(String), // Colors.light.tabIconDefault
    });

    const label = getByTestId('category-button-label');
    expect(flatStyle(label.props.style)).toMatchObject({
      color: expect.any(String), // Colors.light.background
    });
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(
      <CategoryFilterButton 
        label={mockLabel}
        onPress={mockOnPress}
        selected={false}
        testID="category-button"
      />
    );

    const container = getByTestId('category-button-container');
    expect(flatStyle(container.props.style)).toMatchObject({
      flex: 1,
      padding: 8,
      borderRadius: 8,
      borderWidth: 0.5,
    });
  });

  it('handles press event correctly', () => {
    const { getByTestId } = render(
      <CategoryFilterButton 
        label={mockLabel}
        onPress={mockOnPress}
        selected={false}
        testID="category-button"
      />
    );

    const button = getByTestId('category-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});