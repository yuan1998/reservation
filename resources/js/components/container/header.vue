<template>
    <div class="header">
        <div class="user-info right flex-none">
            <el-dropdown split-button type="primary" @command="handleCommand">
                {{ userInfo.name }}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-my-logout"
                                      command="logout">
                        登出
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>

<script>
    import { mapState }       from 'vuex';
    import { logout }         from "../../api/methods/auth";
    import { responseNotify } from "../../utils/assets";

    export default {
        computed: {
            ...mapState({
                userInfo: state => state.Auth.userInfo,
            })
        },
        methods : {
            async handleLogout() {
                console.log('123 :', 123);
                let res = await logout();
                responseNotify(res);
                if (res.result) {
                    this.$router.push('/login');
                }
            },
            handleCommand(command) {
                console.log('command :', command);
                switch (command) {
                    case 'logout':
                        this.handleLogout();
                        break;
                }
            }
        }

    }
</script>

<style scoped lang="less">
    .header {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: flex-start;

        .flex-none {
            flex: none;
        }

        .flex-auto {
            flex: auto;
        }

        .right {
            justify-self: flex-end;
        }

        .user-info {
            margin-left: auto;
        }
    }
</style>
