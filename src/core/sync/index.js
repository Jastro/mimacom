import ROUTES from '@src/core/router';

/**
 * Redirects any other route than ROUTE_SHOP to ROUTE_SHOP
 *
 * @param {VueRouter} router
 */
function redirectToShop(router) {
    router.beforeEach((to, from, next) => {
        next(to.name !== ROUTES.ROUTE_SHOP
            ? { name: ROUTES.ROUTE_SHOP }
            : undefined);
    });
}

/**
 * Enables to sync things between the storage and the router.
 *
 * @param {Vuex.Store} store
 * @param {VueRouter}  router
 */
export function sync(store, router) {
    redirectToShop(router);
}
