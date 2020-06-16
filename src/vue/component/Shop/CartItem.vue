<template>
    <div class="app-cart-item row valign-wrapper">
        <div class="app-cart-item__image col s3 m12 xl4 no-padding">
            <img
                :src="imageUrl"
                :alt="productName"
                draggable="false"
                width="100%"
            >
        </div>
        <div class="app-cart-item__data col s9 m12 xl8">
            <div class="app-cart-item__data-s-xl-wrapper show-on-small show-on-extra-large">
                <div class="app-cart-item__data-s-xl valign-wrapper">
                    <div class="app-cart-item__info col s8 no-padding">
                        <div class="app-cart-item__name">
                            {{ productName }}
                        </div>
                        <div>
                            <a
                                class="app-cart-item__remove white black-text waves-effect waves-light btn btn-small"
                                @click="onRemove"
                            ><i class="material-icons">remove</i></a>
                            <div
                                class="app-cart-item__quantity white black-text btn btn-small"
                                contenteditable
                            >
                                {{ quantity }}
                            </div>
                            <a
                                :class="{'app-cart-item__add': true, 'app-cart-item__add--no-stock': quantity >= stock, 'white': true, 'black-text': true, 'waves-effect': true, 'waves-light': true, 'btn': true, 'btn-small': true}"
                                @click="onAdd"
                            ><i class="material-icons">add</i></a>
                        </div>
                    </div>
                    <div class="app-cart-item__price col s4 no-padding right-align">
                        {{ price }}$
                    </div>
                </div>
            </div>
            <div class="hide-on-small-only hide-on-extra-large-only">
                <div class="valign-wrapper">
                    <div class="col s8 left-align no-padding">
                        <div class="app-cart-item__name">
                            {{ productName }}
                        </div>
                    </div>
                    <div class="app-cart-item__price col s4 no-padding right-align">
                        {{ price }}$
                    </div>
                </div>
                <div class="col s12 no-padding center-align">
                    <div>
                        <a
                            class="app-cart-item__remove white black-text waves-effect waves-light btn btn-small"
                            @click="onRemove"
                        ><i class="material-icons">remove</i></a>
                        <div
                            class="app-cart-item__quantity white black-text btn btn-small"
                            contenteditable
                        >
                            {{ quantity }}
                        </div>
                        <a
                            :class="{'app-cart-item__add': true, 'app-cart-item__add--no-stock': quantity >= stock, 'white': true, 'black-text': true, 'waves-effect': true, 'waves-light': true, 'btn': true, 'btn-small': true}"
                            @click="onAdd"
                        ><i class="material-icons">add</i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CartItem',
        props: {
            imageUrl: {
                type: String,
                required: true,
            },
            productName: {
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
            quantity: {
                type: Number,
                required: true,
            },

            onAdd: {
                type: Function,
                required: true,
            },
            onChange: {
                type: Function,
                required: true,
            },
            onRemove: {
                type: Function,
                required: true,
            },
        },
    };
</script>

<style lang="scss" src="./CartItem.scss" scoped />
