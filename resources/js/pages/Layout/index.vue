<template>
    <el-container v-if="!loading" class="container-wrapper">
        <el-aside class="container-aside" width="200">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header class="container-header">
                <NavBar></NavBar>
            </el-header>
            <el-main class="container-main">
                <TagsView />
                <AppMain />
            </el-main>
            <!--<el-footer class="container-footer">-->
            <!--<Footer></Footer>-->
            <!--</el-footer>-->
        </el-container>
    </el-container>
    <div v-else v-loading.fullscreen.lock="loading"></div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import Aside  from './components/Aside';
    import Header from '../../components/container/header';
    import Footer from '../../components/container/footer';
    import AppMain from './components/AppMain';
    import TagsView from './components/TagsView';
    import NavBar from './components/Navbar';

    export default {
        components: {
            Aside,
            Header,
            Footer,
            AppMain,
            TagsView,
            NavBar
        },
        data() {
            return {
                loading          : true,
                editableTabsValue: '2',
                editableTabs     : [ {
                    title  : 'Tab 1',
                    name   : '1',
                    content: 'Tab 1 content'
                }, {
                    title  : 'Tab 2',
                    name   : '2',
                    content: 'Tab 2 content'
                } ],
                tabIndex         : 2
            }
        },
        computed  : {
            ...mapState('Auth', {
                user: 'userInfo',
            })
        },
        async mounted() {
            this.loading = true;
            // let res      = await this.currentUser();
            this.initMenu();
            this.loading = false;

            this.$bus.$on('index:loading', () => {
                this.loading = true;
            });
            this.$bus.$on('index:loaded', () => {
                this.loading = false;
            });
        },
        methods   : {
            ...mapActions({
                currentUser: 'Auth/me',
                initMenu   : 'Menu/getMenus',
            }),
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs       = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[ Layout + 1 ] || tabs[ Layout - 1 ];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                console.log('tabs :', tabs);
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
</script>

<style>
    .router-view,
    html,
    body,
    #app {
        height: 100%;
    }


</style>
