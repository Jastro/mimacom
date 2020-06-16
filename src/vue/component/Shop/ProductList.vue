<template>
    <section class="app-product-list col s12 m9">
        <div class="app-product-list__header valign-wrapper">
            <div
                class="col s2 show-on-small center-align no-padding"
                style="display: none; cursor: pointer"
                @click="onBack"
            >
                <i class="material-icons medium">navigate_before</i>
            </div>
            <div class="col s8 m12">
                <h4 class="app-product-list__header-text center-align">
                    {{ screenTitle }}
                </h4>
            </div>
            <div
                class="col s2 show-on-small center-align no-padding"
                style="display: none; cursor: pointer"
                @click="onFavoriteFilter"
            >
                <i
                    class="material-icons red-text text-darken-1"
                    style="font-size: 3rem;"
                >
                    {{ showFavorites ? 'favorite' : 'favorite_border' }}
                </i>
            </div>
        </div>
        <div class="row hide-on-small-and-down">
            <div class="col s12 center-align">
                <a
                    class="app-product-list__filter btn btn-small"
                    @click="onFavoriteFilter"
                >
                    <i class="material-icons left">{{ showFavorites ? 'favorite' : 'favorite_border' }}</i>{{ showFavorites ? 'Show All' : 'Show Favorites' }}
                </a>
            </div>
        </div>
        <div class="app-product-list__list row">
            <div style="margin: 0 4vw">
                <div
                    v-for="(item, index) in renderedProducts"
                    :key="item.id"
                    class="col s6 l4 xl3"
                >
                    <slot
                        :item="item"
                        :index="index"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import STORE from '@src/core/store';

    export default {
        name: 'ProductList',
        props: {
            products: {
                type: Array,
                required: true,
            },

            renderSpeed: {
                type: Number,
                default: 50,
            },
            renderChunk: {
                type: Number,
                default: 50,
            },

            onBack: {
                type: Function,
                required: true,
            },
            onFilterFavorites: {
                type: Function,
                required: true,
            },
        },
        data: () => ({
            showFavorites: false,

            renderTimer: null,
            renderedProducts: [],
        }),
        computed: {
            ...mapGetters({
                screenWidth: STORE.GETTERS.GET_SCREEN_WIDTH,
            }),
            screenTitle() {
                return (this.screenWidth > 600)
                    ? 'Product List'
                    : 'New Product';
            },
        },
        watch: {
            products() {
                if (this.renderTimer != null) {
                    clearInterval(this.renderTimer);
                }

                this.renderedProducts = [...this.products.slice(0, this.renderChunk)];
                this.renderTimer = setInterval(() => {
                    if (this.renderedProducts.length < this.products.length) {
                        this.renderedProducts.push(
                            ...this.products.slice(
                                this.renderedProducts.length, this.renderedProducts.length + this.renderChunk));
                    } else {
                        clearInterval(this.renderTimer);
                    }
                }, this.renderSpeed);
            },
        },
        methods: {
            onFavoriteFilter() {
                this.showFavorites = !this.showFavorites;
                this.onFilterFavorites(this.showFavorites);
            },
        },
    };
</script>

<style lang="scss" src="./ProductList.scss" />
