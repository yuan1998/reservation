<template>
    <el-submenu v-if="item.children && item.children.length && !item.hidden" :index="item.index">
        <template slot="title">
            <i :class="`el-icon-${item.icon || 'tickets'}`"></i>
            <span>{{ item.name }}</span>
        </template>
        <Menu v-for="(a, index) in item.children" :item="a" :key="index"></Menu>
    </el-submenu>
    <el-menu-item v-else-if="item.index && !item.hidden" :index="item.index">
        <i :class="`el-icon-${item.icon || 'tickets'}`"></i>
        <span slot="title">{{ item.name }}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name : 'Menu',
        props: {
            item: {
                type: Object,
                default(val) {
                    return val || {};
                }
            }
        },
        methods: {
            showSubmenu(item) {

            }
        }
    }
</script>

<style scoped>

</style>
