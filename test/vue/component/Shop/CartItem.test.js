import { shallowMount } from '@vue/test-utils';
import CartItem from '@vue-component/Shop/CartItem.vue';


describe('<CartItem>', () => {
    const cartItemProps = {
        imageUrl: 'URL',
        productName: 'Name',
        price: 10,
        stock: 1,
        quantity: 5,

        onAdd: jest.fn(),
        onChange: jest.fn(),
        onRemove: jest.fn(),
    };

    beforeEach(()=> {
        cartItemProps.onAdd.mockClear();
        cartItemProps.onChange.mockClear();
        cartItemProps.onRemove.mockClear();
    });

    it('Test <CartItem> props...', () => {
        const wrapper = shallowMount(CartItem, {
            propsData: cartItemProps,
        });

        const { src, alt } = wrapper.find('.app-cart-item__image > img').attributes();
        expect(src).toEqual(cartItemProps.imageUrl);
        expect(alt).toEqual(cartItemProps.productName);

        const price = wrapper.find('.app-cart-item__price').text();
        expect(price).toEqual(cartItemProps.price + '$');

        const quantity = wrapper.find('.app-cart-item__quantity').text();
        expect(quantity).toBe(cartItemProps.quantity.toString());

        const productName = wrapper.find('.app-cart-item__name').text();
        expect(productName).toEqual(cartItemProps.productName);
    });

    it('Test <CartItem> onChanged Callback...', async () => {
        const wrapper = shallowMount(CartItem, {
            propsData: cartItemProps,
        });

        const elementAddButton = wrapper.find('.app-cart-item__add');
        await elementAddButton.trigger('click');
        expect(cartItemProps.onAdd).toHaveBeenCalledTimes(1);
    });

    it('Test <CartItem> onRemove Callback...', async () => {
        const wrapper = shallowMount(CartItem, {
            propsData: cartItemProps,
        });

        const elementRemoveButton = wrapper.find('.app-cart-item__remove');
        await elementRemoveButton.trigger('click');
        expect(cartItemProps.onRemove).toHaveBeenCalledTimes(1);
    });

    it('Test <CartItem> onAdd Callback...', async () => {
        const wrapper = shallowMount(CartItem, {
            propsData: cartItemProps,
        });

        const elementRemoveButton = wrapper.find('.app-cart-item__add');
        await elementRemoveButton.trigger('click');
        expect(cartItemProps.onAdd).toHaveBeenCalledTimes(1);
    });

    it('Test <CartItem> change class stock...', () => {
        const localCartProps = { ...cartItemProps, stock: 0 };

        const wrapper = shallowMount(CartItem, {
            propsData: localCartProps,
        });

        const elementRemoveButton = wrapper.find('.app-cart-item__add');
        expect(elementRemoveButton.classes()).toContain('app-cart-item__add--no-stock');
    });
});
