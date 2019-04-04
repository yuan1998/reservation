<template>
    <div class="page-container home-page">

        <el-row :gutter="12">
            <el-col :span="12">
                <router-link tag="div" to="/reservation/table" class="item-wrapper">
                    <div class="content">
                        <div class="icon">
                            <i class="el-icon-my-yuyue"></i>
                        </div>
                        <div class="text">
                            <div class="title">
                                今日预约
                            </div>
                            <div class="count">
                                {{ count === null ? '--': count }}
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
        </el-row>
        <div class="page-title">
            Dashboard
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import anime          from 'animejs'

    export default {
        name   : 'dashboard',
        data() {
            return {
                count: null
            }
        },
        async mounted() {
            await this.initTodayCount();
        },
        methods: {
            ...mapActions({
                getCount: "Reservation/getCount",
            }),
            async initTodayCount() {
                let res = await  this.getCount();

                if (res.result) {
                    this.count = 0;
                    let count  = res.data.count;

                    anime({
                        targets : this,
                        count,
                        round   : 1,
                        easing  : 'easeOutQuint',
                        duration: 300 + (count * 0.005),
                    });
                }
            }
        }

    }
</script>

<style scoped lang="less">

    .page-title {
        font-size: 44px;
        padding-bottom: 20px;
        padding-left: 10px;
    }

    .table-container {
        padding: 10px 0;
    }

    .item-wrapper {
        border: 1px solid #ededed;
        box-shadow: 0 3px 10px rgba(36, 37, 38, 0.18);
        border-radius: 4px;
        transition: all 300ms ease-in-out;
        background-color: #fff;
        cursor: pointer;

        .title {
            font-size: 18px;
            font-weight: bold;
            color: #999;
        }
        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 35px;

            .icon {
                font-size: 55px;
                line-height: 1;
                color: #409eff;
                padding: 10px;
                transition: all 300ms ease-in-out;
                background-color: transparent;
                border-radius: 5px;
            }
            .text {
                text-align: center;
            }
            .count {
                padding-top: 9px;
                font-size: 27px;
                line-height: 1;
                color: #666666;
                width: 100px;
            }

        }
        &:hover {
            box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
            .icon {
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>
