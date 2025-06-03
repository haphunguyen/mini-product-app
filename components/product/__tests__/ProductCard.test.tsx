import { Product } from '@/stores/useProductsStore';
import { flatStyle } from '@/testHelper/styleHelper';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProductCard from '../ProductCard';

// Mock the useProductsStore
jest.mock('@/stores/useProductsStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the Rating component
jest.mock('@kolking/react-native-rating', () => ({
  Rating: () => null
}));

describe('ProductCard Component', () => {
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
  const mockOnPress = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const { getByTestId } = render(
      <ProductCard 
        item={mockProduct} 
        index={0}
        onPress={mockOnPress}
        testID="product-card"
      />
    );

    // Check if main container exists
    const container = getByTestId('product-card');
    expect(container).toBeTruthy();

    // Check if image is rendered
    const image = getByTestId('product-card-image');
    expect(image.props.source.uri).toBe(mockProduct.image);

    // Check if title is rendered
    const title = getByTestId('product-card-title');
    expect(title.props.children).toBe(mockProduct.title);

    // Check if price is rendered
    const price = getByTestId('product-card-price');
    expect(price.props.children?.join('')).toBe(`$${mockProduct.price}`);
    
    // // // Check if rating is rendered
    // const rating = getByTestId('product-card-rating');
    // expect(rating.props.rating).toBe(mockProduct.rating.rate);

    // // Check if rating value is rendered
    // const ratingValue = getByTestId('product-card-rating-value');
    // expect(ratingValue.props.children).toBe(`(${mockProduct.rating.rate})`);
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(
      <ProductCard 
        item={mockProduct} 
        index={0}
        onPress={mockOnPress}
        testID="product-card"
      />
    );

    const container = getByTestId('product-card');
    expect(flatStyle(container.props.style)).toMatchObject({
      flex: 1,
      borderRadius: 8,
      padding: 12,
      rowGap: 16,
      borderWidth: 0.5,
    });

    const image = getByTestId('product-card-image');
    expect(flatStyle(image.props.style)).toMatchObject({
      width: '100%',
      aspectRatio: 1,
    });
  });

  it('handles press event correctly', () => {
    const { getByTestId } = render(
      <ProductCard 
        item={mockProduct} 
        index={0}
        onPress={mockOnPress}
        testID="product-card"
      />
    );

    const container = getByTestId('product-card');
    fireEvent.press(container);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
