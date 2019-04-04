<template>
    <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
            <router-view ref="page" :key="key" class="router-view"/>
        </keep-alive>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name    : 'AppMain',
        computed: {
            ...mapGetters({
                'cachedViews': 'tagView/cachedViews'
            }),
            key() {
                return this.$route.fullPath
            }
        }
    }
</script>

<style scoped>
    .keep-wrapper {
        flex: auto;
        display: flex;
    }
</style>
