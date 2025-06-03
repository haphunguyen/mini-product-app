import useProductsStore, { Product } from '@/stores/useProductsStore';
import { flatStyle } from '@/testHelper/styleHelper';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CartItem from '../CartItem';

// Mock the useProductsStore
jest.mock('@/stores/useProductsStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CartItem Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://test-image.jpg',
    description: 'Test description',
    category: 'test-category',
    rating: {
      rate: 4.5,
      count: 100
    }
  };
  const mockQuantity = 2;
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      updateQuantityProductSelected: mockUpdateQuantity,
    });
  });

  it('renders correctly with all props', () => {
    const { getByTestId } = render(
      <CartItem 
        product={mockProduct} 
        quantity={mockQuantity} 
        testID="cart-item"
      />
    );

    // Check if main container exists
    const container = getByTestId('cart-item');
    expect(container).toBeTruthy();

    // Check if image is rendered
    const image = getByTestId('cart-item-image');
    expect(image.props.source.uri).toBe(mockProduct.image);

    // Check if title is rendered
    const title = getByTestId('cart-item-title');
    expect(title.props.children).toBe(mockProduct.title);

    // Check if price is rendered
    const price = getByTestId('cart-item-price');
    expect(price.props.children?.join('')).toBe(`$${mockProduct.price}`);
    
    // Check if quantity is rendered
    const quantity = getByTestId('cart-item-quantity');
    expect(quantity.props.children).toBe(mockQuantity);
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(
      <CartItem 
        product={mockProduct} 
        quantity={mockQuantity} 
        testID="cart-item"
      />
    );

    const container = getByTestId('cart-item');
    expect(flatStyle(container.props.style)).toMatchObject({
      flexDirection: 'row',
      padding: 8,
      borderWidth: 0.25,
      borderRadius: 8,
      columnGap: 8,
    });

    const image = getByTestId('cart-item-image');
    expect(flatStyle(image.props.style)).toMatchObject({
      width: 80,
      aspectRatio: 1,
    });
  });

  it('handles increase quantity correctly', () => {
    const { getByTestId } = render(
      <CartItem 
        product={mockProduct} 
        quantity={mockQuantity} 
        testID="cart-item"
      />
    );

    const increaseButton = getByTestId('cart-item-increase');
    fireEvent.press(increaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, mockQuantity + 1);
  });

  it('handles decrease quantity correctly', () => {
    const { getByTestId } = render(
      <CartItem 
        product={mockProduct} 
        quantity={mockQuantity} 
        testID="cart-item"
      />
    );

    const decreaseButton = getByTestId('cart-item-decrease');
    fireEvent.press(decreaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, mockQuantity - 1);
  });
}); 