<template>
    <div
        :class="{'app-product': true, 'app-product--no-stock': !stock, card: true, }"
        @click="onCardClick"
    >
        <div class="app-product__image card-image">
            <img
                :src="imageUrl"
                :alt="productName"
                draggable="false"
            >
            <a
                class="app-product__favorite btn btn-floating transparent"
                @click="onFavorite"
            >
                <i class="small material-icons red-text text-darken-1">{{ favorite ? 'favorite' : 'favorite_border' }}</i>
            </a>
        </div>
        <div class="app-product__content">
            <div class="app-product__heading row">
                <div class="col s12 m8">
                    <span class="app-product__name">{{ productName }}</span>
                </div>
                <div class="app-product__price col m4 right-align">
                    <span>{{ price }}$</span>
                </div>
            </div>
            <p class="app-product__description hide-on-small-and-down">
                {{ productDescription }}
            </p>
            <div class="row valign-wrapper hide-on-small-and-down">
                <div class="app-product__stock col l4">
                    {{ stock }} left
                </div>
                <div class="col l8 no-pad right-align">
                    <a
                        class="app-product__add waves-effect waves-light btn-small white black-text"
                        @click="onAdd"
                    >
                        <i class="material-icons left">add</i>Add
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import STORE from '@src/core/store';

    export default {
        props: {
            imageUrl: {
                type: String,
                required: true,
            },
            productName: {
                type: String,
                required: true,
            },
            productDescription: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            stock: {
                type: Number,
                required: true,
            },
            favorite: {
                type: Boolean,
                required: true,
            },

            onAdd: {
                type: Function,
                required: true,
            },
            onFavorite: {
                type: Function,
                required: true,
            },
        },
        computed: {
            ...mapGetters({
                screenWidth: STORE.GETTERS.GET_SCREEN_WIDTH,
            }),
        },
        watch: {
            screenWidth() {
                if (this.$refs['cart'] && this.$refs['cart'].scrollTop > 0) {
                    this.$refs['cart'].scrollTo(0, 0);
                }
            },
        },
        methods: {
            onCardClick() {
                if (this.screenWidth < 601) {
                    this.onAdd();
                }
            },
        },
    };
</script>

<style lang="scss" src="./Product.scss" scoped />
