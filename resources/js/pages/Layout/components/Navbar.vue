<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatarInfo+'?imageView2/1/w/80/h/80'" class="user-avatar">
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="handleLogout">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { responseNotify }       from "../../../utils/assets";
    import Breadcrumb               from '../../../components/Breadcrumb'
    import Hamburger                from '../../../components/Hamburger'
    import avatar                   from '../../../images/avatar.png';

    export default {
        components: {
            Breadcrumb,
            Hamburger,
        },
        data() {
            return {
                avatar
            }
        },
        computed  : {
            ...mapState({
                userInfo: state => state.Auth.userInfo,
            }),
            ...mapGetters([
                'sidebar',
                'device'
            ]),
            avatarInfo() {
                return (this.userInfo && this.userInfo.avatar )|| this.avatar;
            }
        },
        methods   : {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            async handleLogout() {
                this.$store.dispatch('Auth/logout');

                let res = {
                    result: true,
                }

                responseNotify(res);
                if (res.result) {
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }
        .breadcrumb-container {
            float: left;
        }
        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }
        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;
                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;
                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }
            .avatar-container {
                margin-right: 30px;
                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;
                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
