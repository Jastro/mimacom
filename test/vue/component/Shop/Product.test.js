import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { default as STORE, StoreConfig } from '@src/core/store';
import Product from '@vue-component/Shop/Product.vue';

describe('<Product>', () => {
    const productProps = {
        imageUrl: 'URL',
        productName: 'Name',
        productDescription: 'Description',
        price: 1,
        stock: 1,
        favorite: false,

        onAdd: jest.fn(),
        onFavorite: jest.fn(),
    };
    let localVue;
    let store;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store(StoreConfig);
    });

    it('Test <Product> props...', () => {
        const wrapper = shallowMount(Product, {
            store,
            localVue,
            propsData: productProps,
        });

        const { src, alt } = wrapper.find('.app-product__image > img').attributes();

        expect(src).toEqual(productProps.imageUrl);
        expect(alt).toEqual(productProps.productName);

        const productDescription = wrapper.find('.app-product__description').text();
        expect(productDescription).toEqual(productProps.productDescription);

        const price = wrapper.find('.app-product__price').text();
        expect(price).toEqual(productProps.price + '$');

        const stock = wrapper.find('.app-product__stock').text();
        expect(stock).toEqual(productProps.stock + ' left');

        const favorite = wrapper.find('.app-product__image .material-icons').text();
        expect(favorite).toEqual('favorite_border');
    });

    it('Test <Product> onAdd Callback...', async () => {
        const wrapper = shallowMount(Product, {
            store,
            localVue,
            propsData: productProps,
        });

        store.commit(STORE.MUTATIONS.SET_SCREEN_SIZE, { width: 601, height: 0 });

        const elementAddButton = wrapper.find('.app-product__add');
        await elementAddButton.trigger('click');
        expect(productProps.onAdd).toHaveBeenCalledTimes(1);
    });

    it('Test <Product> onFavorite Callback...', async () => {
        const wrapper = shallowMount(Product, {
            store,
            localVue,
            propsData: productProps,
        });

        const elementFavoriteButton = wrapper.find('.app-product__favorite');
        await elementFavoriteButton.trigger('click');
        expect(productProps.onFavorite).toHaveBeenCalledTimes(1);
    });

    it('Test <Product> onCard Callback...', async () => {
        const wrapper = shallowMount(Product, {
            store,
            localVue,
            propsData: productProps,
        });

        store.commit(STORE.MUTATIONS.SET_SCREEN_SIZE, { width: 580, height: 0 });

        const elementCardClicked = wrapper.find('.app-product');
        await elementCardClicked.trigger('click');
        expect(productProps.onAdd).toHaveBeenCalledTimes(1);
    });
});
