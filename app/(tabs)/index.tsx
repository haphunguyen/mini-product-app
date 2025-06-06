import { Alert, FlatList, Platform, ScrollView, StyleSheet } from 'react-native';


import CategoryFilterButton from '@/components/product/CategoryFilterButton';
import Loading from '@/components/product/Loading';
import ProductCard from '@/components/product/ProductCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarHeight } from '@/constants/TabBar';
import useProductsStore, { Product } from '@/stores/useProductsStore';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function ProductsScreen() {
  const { products, setProducts } = useProductsStore()
  const { navigate } = useRouter()
  const [categoryFilter, setCategoryFilter] = useState<string>()
  const [loading, setLoading] = useState(false)
  const isTablet = Device.deviceType === Device.DeviceType.TABLET

  const categories = useMemo(() => {
    const setCategories = new Set<string>()
    products.forEach(p => {
      setCategories.add(p.category)
    });
    return Array.from(setCategories)
  }, [products])

  const productsFiltered = useMemo(() => {
    if (categoryFilter) return products.filter(p => p.category === categoryFilter)
    return products
  }, [categoryFilter, products])

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

  useEffect(() => {
    setLoading(true)
    void getProduct().then((data: Product[]) => {
      if (data.length > 0)
        setProducts(data)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      Alert.alert('Error', error)
    })
  }, [getProduct, setProducts])

  const renderItem = useCallback(({ item, index }: { item: Product, index: number }) => {
    return (
      <ProductCard
        item={item}
        index={index}
        key={item.id}
        onPress={() => {
          navigate({ pathname: '/cart-detail', params: { id: item.id } })
        }} />
    )
  }, [navigate])

  const renderHeader = useCallback(() => {
    return (
      <ThemedView style={styles.headerContainer}>
        <ThemedText type='defaultSemiBold'>Filter</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {categories.map((c) => (
            <CategoryFilterButton key={c} label={c} onPress={() => {
              setCategoryFilter(categoryFilter === c ? undefined : c)
            }} selected={categoryFilter === c} />
          ))}
        </ScrollView>
      </ThemedView>
    )
  }, [categories, categoryFilter])

  if (loading)
    return (
      <ThemedView style={styles.loadingContainer}>
        <Loading />
      </ThemedView>
    )

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={productsFiltered}
        style={styles.products}
        contentContainerStyle={styles.spacingItem}
        columnWrapperStyle={styles.spacingItem}
        ListHeaderComponent={renderHeader}
        numColumns={isTablet ? 4 : 2}
        stickyHeaderIndices={[0]}
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
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  spacingItem: {
    rowGap: 12,
    columnGap: 8,
  },
  products: {
    marginBottom: Platform.select({
      ios: TabBarHeight
    }),
  },
  headerContainer: {
    flexDirection: 'column',
    rowGap: 4,
    paddingVertical: 4,
  },
  scrollContainer: {
    columnGap: 8
  }
});
