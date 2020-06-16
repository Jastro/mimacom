<template>
    <section class="app-shop row no-pad">
        <ProductList
            v-slot="{item, index}"
            :products="products_filtered"

            :on-back="onCartOpen"
            :on-filter-favorites="onFilterFavorites"
        >
            <Product
                :image-url="item.image_url"
                :product-name="item.productName"
                :product-description="item.productDescription"
                :price="item.price"
                :stock="item.stock"
                :favorite="!!item.favorite"

                :on-add="onProductAdd(index)"
                :on-favorite="onProductFavorite(index)"
            />
        </ProductList>
        <Cart
            v-slot="{id, quantity}"
            :items="items"
            :products="products"

            :is-open="isCartOpen"

            :on-back="onCartClose"
            :on-clear="onCartClear"
            :on-checkout="onCartCheckout"
        >
            <CartItem
                v-for="item in [getProductById(id)]"
                :key="item.id"

                :image-url="item.image_url"
                :product-name="item.productName"
                :price="item.price"
                :stock="item.stock"
                :quantity="quantity"

                :on-add="onCartItemAdd(item.id)"
                :on-change="onCartItemChange(item.id)"
                :on-remove="onCartItemRemove(item.id)"
            />
        </Cart>
    </section>
</template>

<script>
    import {
        getAllProducts,
        getFavoriteProducts,
        setProductFavorite,
        setProductStock,
    } from '@service/api-service';

    import Cart from '@vue-component/Shop/Cart';
    import CartItem from '@vue-component/Shop/CartItem';
    import Product from '@vue-component/Shop/Product';
    import ProductList from '@vue-component/Shop/ProductList';

    export default {
        name: 'Shop',
        components: {
            Cart,
            CartItem,
            Product,
            ProductList,
        },
        data: () => ({
            isCartOpen: false,
            isFavorite: false,

            items: {
                // '1db18081-575b-47b2-b0d8-395314a6b327': 1,
                // '7eca1ea3-0bf6-4b00-bb6b-e08ba834dd4e': 1,
                // '41fb4f07-22fd-4ef6-b23c-1ac022b57d11': 1,
                // '11a7aee9-d712-4395-9c35-bde70c9f0171': 3,
            },

            products: [],
            products_filtered: [],
        }),
        mounted() {
            getAllProducts()
                .then((products) => {
                    this.products = products;
                    this.products_filtered = products;
                });
        },
        methods: {
            getProductById(id) {
                const products = this.products.filter((item) => item.id === id);
                return products.length
                    ? products[0]
                    : null;
            },

            onFilterFavorites(isFilteredFavorite) {
                this.isFavorite = isFilteredFavorite;
                if (isFilteredFavorite) {
                    getFavoriteProducts()
                        .then((products) => {
                            this.products_filtered = products;
                        });
                } else {
                    this.products_filtered = this.products;
                }
            },

            onProductAdd(index) {
                return () => {
                    const id = this.products_filtered[index].id;
                    this.$set(this.items, id, this.items[id]
                        ? this.items[id] < this.products_filtered[index].stock ? this.items[id] + 1 : this.items[id]
                        : 1);
                };
            },
            onProductFavorite(index) {
                return () => {
                    const product = this.products[index];
                    product.favorite = product.favorite ? 0 : 1;

                    const { id, favorite } = product;
                    setProductFavorite(id, favorite);
                };
            },

            onCartOpen() {
                this.isCartOpen = true;
            },
            onCartClose() {
                this.isCartOpen = false;
            },
            onCartClear() {
                this.items = {};
            },
            onCartCheckout() {
                this.items.length && getAllProducts()
                    .then((products) => {
                        this.products = products;

                        const adquiredIds = Object.keys(this.items);
                        const adquiredItems = this.products
                            .filter(({ id }) => adquiredIds.includes(id));

                        const wrongStockItems = adquiredItems
                            .filter(({ id, stock }) => this.items[id] > stock);

                        if (wrongStockItems.length) {
                            // Show error
                            wrongStockItems.forEach(({ id, stock }) => {
                                this.items[id] = stock;
                                if (this.isFavorite) {
                                    return getFavoriteProducts()
                                        .then((products) => {
                                            this.products_filtered = products;
                                        });
                                } else {
                                    this.products_filtered = this.products;
                                }
                            });
                        } else {
                            const productUpdates = adquiredItems
                                .map(({ id, stock }) => setProductStock(id, stock - this.items[id])
                                    .catch(() => null));

                            return Promise.all(productUpdates)
                                .then((result) => {
                                    const failed = result.filter((item) => item === null).length;
                                    if (failed) {
                                        // Show error
                                    }

                                    this.onCartClear();
                                    return getAllProducts()
                                        .then((products) => {
                                            this.products = products;
                                            if (this.isFavorite) {
                                                return getFavoriteProducts()
                                                    .then((products) => {
                                                        this.products_filtered = products;
                                                    });
                                            } else {
                                                this.products_filtered = this.products;
                                            }
                                        });
                                });
                        }
                    });
            },

            onCartItemAdd(id) {
                return () => {
                    const product = this.getProductById(id);
                    this.items[id] += this.items[id] < product.stock ? 1 : 0;
                };
            },
            onCartItemChange(id) {
                return () => {};
            },
            onCartItemRemove(id) {
                return () => {
                    this.items[id] -= 1;
                    if (this.items[id] <= 0) {
                        delete this.items[id];
                    }
                };
            },
        },
    };
</script>

<style lang="scss" src="./Shop.scss" />
