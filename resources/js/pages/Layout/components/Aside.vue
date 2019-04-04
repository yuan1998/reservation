<template>
    <div class="aside-container">
        <div class="side-menu-container" >
            <Slidebar></Slidebar>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Slidebar from './sidebar';
    export default {
        components: {
            Slidebar
        },
        data() {
            let path = this.$route.path;
            return {
                active: path
            }
        },
        mounted() {
            // console.log('aside :');
            // this.test();
        },
        methods   : {
            ...mapActions({
                test: 'Menu/getMenus'
            }),
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(index, indexPath) {

            }
        },
        computed  : {
            ...mapState('Menu', {
                menus: state => state.menus
            }),
            isCollapse() {
                return false;
            }
        }
    }
</script>

<style scoped>
    .aside-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .side-menu-container {
        flex: 1;
        overflow: auto;
        border-right: 1px solid #e5e5e5;
    }

</style>
