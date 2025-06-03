import { useThemeColor } from '@/hooks/useThemeColor';
import { flatStyle } from '@/testHelper/styleHelper';
import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from '../Loading';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('Loading Component', () => {
  beforeEach(() => {
    // Mock the theme color to return a specific color
    (useThemeColor as jest.Mock).mockReturnValue('#000000');
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Loading testID={'loading-container'}/>);
    const loadingContainer = getByTestId('loading-container');
    expect(loadingContainer).toBeTruthy();
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(<Loading testID={'loading'}/>);
    const loadingContainer = getByTestId('loading-container');
    
    expect(flatStyle(loadingContainer.props.style)).toMatchObject({
      width: 40,
      aspectRatio: 1,
      borderRadius: 100,
      borderWidth: 2,
      borderStyle: 'dotted',
      borderColor: '#000000',
    });
  });

  it('uses theme color for border', () => {
    const mockColor = '#FF0000';
    (useThemeColor as jest.Mock).mockReturnValue(mockColor);
    
    const { getByTestId } = render(<Loading testID={'loading'}/>);
    const loadingContainer = getByTestId('loading-container');
    expect(flatStyle(loadingContainer.props.style).borderColor).toBe(mockColor);
  });
});
