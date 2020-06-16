const STORE = {
    GETTERS: {
        GET_SCREEN_SIZE: 'getScreenSize',
        GET_SCREEN_WIDTH: 'getScreenWidth',
        GET_SCREEN_HEIGHT: 'getScreenHeight',

        GET_SCREEN_SCROLL_TOP: 'getScreenScrollTop',
        GET_SCREEN_SCROLL_LEFT: 'getScreenScrollLeft',
    },
    MUTATIONS: {
        SET_SCREEN_SIZE: 'setScreenSize',
        SET_SCREEN_SCROLL: 'setScreenScroll',
    },
};

export const StoreConfig = {
    state: {
        Screen: {
            width: 0,
            height: 0,

            scrollTop: 0,
            scrollLeft: 0,
        },
    },
    getters: {
        [STORE.GETTERS.GET_SCREEN_SIZE](state) {
            return state.Screen;
        },
        [STORE.GETTERS.GET_SCREEN_WIDTH](state) {
            return state.Screen.width;
        },
        [STORE.GETTERS.GET_SCREEN_HEIGHT](state) {
            return state.Screen.height;
        },
        [STORE.GETTERS.GET_SCREEN_SCROLL_TOP](state) {
            return state.Screen.scrollTop;
        },
        [STORE.GETTERS.GET_SCREEN_SCROLL_LEFT](state) {
            return state.Screen.scrollLeft;
        },
    },
    mutations: {
        [STORE.MUTATIONS.SET_SCREEN_SIZE](state, { width, height }) {
            state.Screen.width = width;
            state.Screen.height = height;
        },
        [STORE.MUTATIONS.SET_SCREEN_SCROLL](state, { scrollTop, scrollLeft }) {
            state.Screen.scrollTop = scrollTop;
            state.Screen.scrollLeft = scrollLeft;
        },
    },
};

export default {
    ...STORE,
};
