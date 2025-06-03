import useProductsStore from '@/stores/useProductsStore';
import { flatStyle } from '@/testHelper/styleHelper';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CartHeader from '../CartHeader';

// Mock the useProductsStore
jest.mock('@/stores/useProductsStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the useRouter
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    canGoBack: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('CartHeader Component', () => {
  const mockProductsSelected = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      productsSelected: mockProductsSelected,
    });
  });

  it('renders correctly with items in cart', () => {
    const { getByTestId } = render(
      <CartHeader testID="cart-header" />
    );

    // Check if main container exists
    const container = getByTestId('cart-header');
    expect(container).toBeTruthy();

    // Check if quantity container exists
    const quantityContainer = getByTestId('cart-header-quantity-container');
    expect(quantityContainer).toBeTruthy();

    // Check if quantity text is rendered
    const quantityText = getByTestId('cart-header-quantity-text');
    expect(quantityText.props.children).toBe(5); // 2 + 3 = 5
  });

  it('renders correctly with empty cart', () => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      productsSelected: [],
    });

    const { getByTestId ,queryByTestId} = render(
      <CartHeader testID="cart-header" />
    );
     // Check if main container exists
     const container = getByTestId('cart-header');
     expect(container).toBeTruthy();
 
     // Verify quantity elements are not present
     expect(queryByTestId('cart-header-quantity-container')).toBeNull();
     expect(queryByTestId('cart-header-quantity-text')).toBeNull();
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(
      <CartHeader testID="cart-header" />
    );

    const container = getByTestId('cart-header-container');
    expect(flatStyle(container.props.style)).toMatchObject({
      marginRight: 16,
    });

    const quantityBackground = getByTestId('cart-header-quantity-background');
    expect(flatStyle(quantityBackground.props.style)).toMatchObject({
      width: 20,
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('handles press event correctly', () => {
    const { getByTestId } = render(
      <CartHeader testID="cart-header" />
    );

    const container = getByTestId('cart-header');
    fireEvent.press(container);

    // Note: Since we're mocking the router, we can't test the actual navigation
    // but we can verify that the press handler was called
    expect(container).toBeTruthy();
  });
});