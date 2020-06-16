<template lang="pug">
    section
        main.no-padding
            router-view
</template><script>
    import STORE from '@src/core/store';

    export default {
        mounted() {
            window.addEventListener('resize', this.onResize);
            window.addEventListener('scroll', this.onScroll);

            this.onResize();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            onResize() {
                this.$store.commit(STORE.MUTATIONS.SET_SCREEN_SIZE, {
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            },
            onScroll() {
                this.$store.commit(STORE.MUTATIONS.SET_SCREEN_SCROLL, {
                    scrollTop: document.documentElement.scrollTop,
                    scrollLeft: document.documentElement.scrollLeft,
                });
            },
        },
    };
</script>

<style lang="scss" src="./App.scss"/>
