<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :default-active="$route.path"
                :collapse="isCollapse"
                :collapse-transition="false"
                background-color="#304156"
                text-color="#bfcbd8"
                active-text-color="#409eff"
                mode="vertical">
            <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SidebarItem from './sidebarItem'

    export default {
        components: { SidebarItem },
        computed: {
            permission_routes() {
                return this.$store.state.Permission.routes;
            },
            sidebar() {
                return this.$store.state.app.sidebar;
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>
