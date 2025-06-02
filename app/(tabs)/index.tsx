import { Alert, FlatList, StyleSheet } from 'react-native';


import ProductItem from '@/components/product/ProductItem';
import { ThemedView } from '@/components/ThemedView';
import { TabBarHeight } from '@/constants/TabBar';
import useProductsStore, { Product } from '@/stores/useProductsStore';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';

export default function ProductsScreen() {
  const { products, setProducts } = useProductsStore()
  const { navigate, setParams } = useRouter()

  const getProduct = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const jsonData = await response.json()
      return Promise.resolve(jsonData)
    } catch (_) {
      return Promise.reject('Fetch data failed.')
    }
  }, [])

  const renderItem = useCallback(({ item, index }: { item: Product, index: number }) => {
    return (
      <ProductItem
        item={item}
        index={index}
        key={item.id}
        onPress={() => {
          navigate({ pathname: '/cart-detail', params: { id: item.id } })
        }} />
    )
  }, [navigate])

  useEffect(() => {
    void getProduct().then((data: Product[]) => {
      if (data.length > 0)
        setProducts(data)
    }).catch(error => {
      Alert.alert('Error', error)
    })
  }, [getProduct, setProducts])


  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={products}
        style={styles.products}
        contentContainerStyle={styles.spacingItem}
        columnWrapperStyle={styles.spacingItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  spacingItem: {
    rowGap: 12,
    columnGap: 8,
  },
  products: {
    marginBottom: TabBarHeight,
    paddingVertical: 8,
  }
});
