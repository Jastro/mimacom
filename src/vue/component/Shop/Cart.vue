<template>
    <section
        ref="cart"
        :class="{ 'app-cart': true, 'app-cart--open': isOpen, col: true, s12: true, m3: true, white: true}"
        @scroll.passive="onScroll"
    >
        <div class="app-cart__wrapper">
            <div class="app-cart__header valign-wrapper">
                <div
                    class="col s2 show-on-small center-align no-padding"
                    style="display: none; cursor: pointer"
                    @click="onBack"
                >
                    <i class="material-icons medium">navigate_before</i>
                </div>
                <div class="col s8 m12">
                    <h4 class="app-product-list__header-text center-align">
                        Cart
                    </h4>
                </div>
                <div
                    class="col s2 show-on-small center-align no-padding"
                    style="display: none; cursor: pointer"
                    @click="onClear"
                >
                    <i
                        class="material-icons"
                        style="font-size: 3rem;"
                    >
                        delete_forever
                    </i>
                </div>
            </div>
            <div
                v-if="products.length"
                class="app-cart__list"
            >
                <div
                    v-for="item in Object.keys(items)"
                    :key="item"
                    class="app-cart__item-wrapper col s12"
                >
                    <slot
                        :id="item"
                        :quantity="items[item]"
                    />
                </div>
            </div>
            <div
                ref="checkout-wrapper"
                class="app-cart__checkout-wrapper"
            >
                <div class="app-cart__gradient" />
                <div class="app-cart__checkout-bottom-wrapper white">
                    <div class="app-cart__checkout-button-wrapper">
                        <a
                            class="app-cart__checkout-button btn"
                            @click="onCheckout"
                        >
                            Checkout
                        </a>
                    </div>
                    <span class="app-cart__checkout-total">{{ total }}$</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import STORE from '@src/core/store';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            items: {
                type: Object,
                required: true,
            },
            products: {
                type: Array,
                required: true,
            },

            isOpen: {
                type: Boolean,
                required: true,
            },

            onBack: {
                type: Function,
                required: true,
            },
            onClear: {
                type: Function,
                required: true,
            },
            onCheckout: {
                type: Function,
                required: true,
            },
        },
        computed: {
            total() {
                return this.products
                    .filter((item) => Object.keys(this.items).includes(item.id))
                    .reduce((result, item) => result + (item.price * this.items[item.id]), 0);
            },
            ...mapGetters({
                screenWidth: STORE.GETTERS.GET_SCREEN_WIDTH,
                screenScrollLeft: STORE.GETTERS.GET_SCREEN_SCROLL_LEFT,
            }),
        },
        watch: {
            screenWidth() {
                if (this.$refs['cart'].scrollTop > 0) {
                    this.$refs['cart'].scrollTo(0, 0);
                }
            },
            isOpen(isOpen) {
                if (isOpen) {
                    this.$refs['cart']
                        .setAttribute('style', `left: -${this.screenScrollLeft}px !important`);
                } else {
                    this.$refs['cart'].removeAttribute('style');
                }
            },
            screenScrollLeft(screenScrollLeft) {
                if (this.isOpen) {
                    this.$refs['cart']
                        .setAttribute('style', `left: -${screenScrollLeft}px !important`);
                } else {
                    this.$refs['cart'].removeAttribute('style');
                }
            },
        },
        methods: {
            onScroll(evt) {
                const scroll = evt.target.scrollTop;
                this.$refs['checkout-wrapper'].style.bottom = `-${scroll}px`;
            },
        },
    };
</script>

<style lang="scss" src="./Cart.scss" scoped />
