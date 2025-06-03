import { FlatList, Platform, StyleSheet } from 'react-native';

import CartItem from '@/components/product/CartItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarHeight } from '@/constants/TabBar';
import { useThemeColor } from '@/hooks/useThemeColor';
import useProductsStore, { Product, ProductSelected } from '@/stores/useProductsStore';
import { useCallback, useMemo } from 'react';

export default function CartScreen() {
  const { productsSelected, products } = useProductsStore()
  const colorTint = useThemeColor('tint')
  const productsByKey = useMemo(() => {
    const pbk = {} as { [key: number]: Product }
    products.forEach(p => {
      pbk[p.id] = p
    });
    return pbk
  }, [products])
  const totalQuantity = useMemo(() => productsSelected.reduce((preValue, currentValue) => preValue + currentValue.quantity, 0), [productsSelected])
  const totalPrice = useMemo(() => productsSelected.reduce((preValue, currentValue) => preValue + currentValue.quantity * productsByKey[currentValue.id].price, 0).toFixed(2), [productsByKey, productsSelected])



  const renderItem = useCallback(({ item }: { item: ProductSelected }) => {
    const productItem = productsByKey?.[item.id] as unknown as Product
    return (
      <CartItem product={productItem} quantity={item.quantity} key={item.id} />
    )
  }, [productsByKey])

  const renderEmpty = useCallback(() => {
    return (
      <ThemedView>
        <ThemedText>Nothing in here</ThemedText>
      </ThemedView>
    )
  }, [])


  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={productsSelected}
        style={styles.products}
        contentContainerStyle={styles.spacingItem}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        keyExtractor={item => item.id?.toString()}
      />
      {totalQuantity > 0 && <ThemedView style={styles.viewTotal}>
        <ThemedText type='defaultSemiBold'>Total item: {totalQuantity}</ThemedText>
        <ThemedText type='defaultSemiBold' style={{ color: colorTint }}>Total price: ${totalPrice}</ThemedText>
      </ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    marginBottom: Platform.select({
      ios: TabBarHeight
    }),
  },
  products: {
    paddingTop: 8,
    flex: 1,
  },
  spacingItem: {
    rowGap: 12,
    columnGap: 8,
  },
  viewTotal: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
