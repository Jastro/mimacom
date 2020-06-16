import Home from '@vue-view/Home.vue';
import Shop from '@vue-view/Shop.vue';

const ROUTES = {
    ROUTE_HOME: 'HOME',
    ROUTE_SHOP: 'SHOP',
};

export const RouterConfig = {
    mode: 'history',
    routes: [
        { name: ROUTES.ROUTE_HOME, path: '/', component: Home },
        { name: ROUTES.ROUTE_SHOP, path: '/shop', component: Shop },
    ],
};

export default {
    ...ROUTES,
};
