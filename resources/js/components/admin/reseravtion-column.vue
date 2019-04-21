<template>
    <div class="item-wrapper">
        <div class="loading-wrapper" v-if="loading" v-loading="loading"></div>
        <div v-if="hasReservation" v-for="(value ,key) in reservation" :key="key" class="reservation-wrapper">
            <div class="project-title">
                {{ProjectName[key]}}
            </div>
            <div class="reservation-group">
                <el-popover
                        v-for="(each , index) in value" :key="index"
                        placement="top"
                        width="300"
                        trigger="click">
                    <el-form class="reservation-content" label-position="right" label-width="80px">
                        <el-form-item label="姓名 :">
                            <div class="item-text">
                                {{ each.name }}
                            </div>
                        </el-form-item>
                        <el-form-item label="年龄 :">
                            <div class="item-text">
                                {{ each.age }}
                            </div>
                        </el-form-item>
                        <el-form-item label="性别 :">
                            <div class="item-text">
                                {{ each.sex }}
                            </div>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <div class="item-text">
                                {{ each.phone }}
                            </div>
                        </el-form-item>

                        <el-form-item label="预约项目 :">
                            <div class="item-text">
                                {{ ProjectName[key] }}
                            </div>
                        </el-form-item>
                        <el-form-item label="预约时间 :">
                            <div class="item-text">
                                {{ each.date }}
                            </div>
                        </el-form-item>


                        <el-form-item label="医生 :">
                            <div class="item-text">
                                {{ item.name }}
                            </div>
                        </el-form-item>

                        <el-form-item label="备注 :">
                            <div class="item-text">
                                {{ each.description }}
                            </div>
                        </el-form-item>
                        <el-form-item label="创建人 :">
                            <div class="item-text">
                                {{ each.createdBy  ? each.createdBy.name : '无'}}
                            </div>
                        </el-form-item>
                        <el-form-item label="上次修改 :">
                            <div class="item-text">
                                {{ each.updatedBy  ? each.updatedBy.name : '无'}}
                            </div>
                        </el-form-item>


                        <div style="text-align: center; margin-top: 10px">
                            <el-button v-if="canChangeReservation"
                                       size="mini"
                                       type="success"
                                       @click="handleReservation('edit' , each)">
                                修改
                            </el-button>
                            <el-button v-if="canUserDelete(each)"
                                       size="mini"
                                       type="danger"
                                       @click="handleDelete(each)">
                                删除
                            </el-button>
                        </div>
                    </el-form>
                    <div class="name"
                         slot="reference">
                        {{ each.name }}
                    </div>
                </el-popover>
            </div>
        </div>
        <div v-if="isRest" class="rest-container">
            <div class="rest-text">
                休息
                <p v-if="hasReservation">
                    {{ `(有${reservationLength}条预约)` }}
                </p>
            </div>
        </div>
        <div v-if="!isRest && !hasReservation">
            - 无 -
        </div>
        <el-popover style="position: static;"
                    placement="left"
                    v-if="canRest || canAddReservation"
                    v-model="show">
            <div v-if="isRest" style="text-align: center;">
                <el-button v-if="canRest"
                           type="primary"
                           size="small"
                           icon="el-icon-my-sleep"
                           @click="handleUnrest()">
                    取消休息
                </el-button>
            </div>
            <template v-else>
                <el-button v-if="canAddReservation"
                           size="small"
                           type="success"
                           icon="el-icon-plus"
                           @click="handleReservation('new' , {expert_id:item.id })">
                    预约
                </el-button>
                <el-button v-if="canRest"
                           type="primary"
                           size="small"
                           icon="el-icon-my-sleep"
                           @click="handleRest()">
                    休息
                </el-button>
            </template>
            <el-button class="menu-button" size="mini" slot="reference" type="danger" icon="el-icon-menu"></el-button>
        </el-popover>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import { oneOf, responseNotify, hasTime }   from "../../utils/assets";

    export default {
        props   : {
            item        : Object,
            id          : Number,
            project     : [ String, Object ],
            dateTime    : String,
            rests       : Array,
            reservations: Array,
            timelines   : Array,
        },
        data() {
            return {
                show   : false,
                loading: false,
            }
        },
        computed: {
            ...mapGetters({
                ProjectName    : 'Project/idOfName',
                permissionsName: 'Auth/permission',
            }),
            idOfTimelines() {
                return this.timelines.map((each) => {
                    return each.id;
                })
            },
            canRest() {
                return this.$hasPermission('rest:store');
            },
            canAddReservation() {
                return this.$hasPermission('reservation:store');
            },
            canRemoveReservation() {
                return this.$hasPermission('reservation:destroy');
            },
            canChangeReservation() {
                return this.$hasPermission('reservation:update');
            },
            reservation() {
                let { id } = this.item;

                let result = {};
                (this.reservations || []).forEach((item) => {
                    let tl = hasTime(item.date);
                    if (tl) {
                        item.timeline_id = tl.id;
                    }
                    else {
                        return;
                    }

                    if (item.timeline_id === this.id && item.expert_id === id) {
                        if (!result[ item.project_id ]) {
                            result[ item.project_id ] = [];
                        }
                        result[ item.project_id ].push(item);
                    }
                });

                if (this.project && this.project.id) {
                    result = result[ this.project.id ] ? { [ this.project.id ]: result[ this.project.id ] } : {};
                }
                return result;
            },
            reservationLength() {
                let count = 0;
                for (let key in this.reservation) {
                    let item = this.reservation[ key ];
                    count += item.length;
                }
                return count;
            },
            hasReservation() {
                return this.reservation && Object.keys(this.reservation).length > 0;
            },
            restItem() {
                let { id } = this.item;
                return (this.rests || []).filter((each) => {
                    return each.timeline_id === this.id && each.expert_id === id;
                });
            },
            isRest() {
                return !!this.restItem.length;
            },
        },
        methods : {
            ...mapActions({
                createRest       : 'Rest/createRest',
                deleteRest       : 'Rest/deleteRest',
                deleteReservation: 'Reservation/deleteReservation',
            }),
            canUserDelete(item) {
                let user     = this.$store.state.Auth.userInfo;
                let createBy = item.createdBy || {};
                return this.canRemoveReservation || user.id === createBy.id
            },
            async handleRest() {
                let pass = true;
                if (this.hasReservation) {
                    try {
                        await this.$confirm('该医生当前时间段有预约,是否继续', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText : '取消',
                            type             : 'warning'
                        })
                    } catch (e) {
                        pass = false;
                    }
                }

                if (!pass) {
                    return;
                }

                let data = {
                    expert_id  : this.item.id,
                    timeline_id: this.id,
                    date       : this.dateTime,
                };

                this.loading = true;
                this.show    = false;
                let res      = await this.createRest(data);
                this.$emit('get-rests');
                this.loading = false;

                responseNotify(res);
            },

            handleReservation(type = 'new', item = {}) {
                this.show = false;
                this.$emit('reservation', type, item);
            },
            async handleDelete(item) {
                let pass = true;
                try {
                    await this.$confirm('确定要删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText : '取消',
                        type             : 'warning'
                    })
                } catch (e) {
                    pass = false;
                }

                if (pass) {
                    this.loading = true;
                    let res      = await this.deleteReservation({ id: item.id, date: item.date });
                    this.$emit('get-reservation');
                    this.loading = false;
                    responseNotify(res);
                }
            },
            handleUnrest() {
                if (this.isRest) {
                    this.handleRemoveRest(this.restItem);
                }
            },
            async handleRemoveRest(items) {
                let id = items[ 0 ].id;
                if (!id) {
                    return;
                }
                this.loading = true;
                this.show    = false;

                let res = await this.deleteRest({ id, date: this.dateTime });
                this.$emit('get-rests');
                this.loading = false;

                responseNotify(res);
            },
        }
    }
</script>

<style scoped lang="less">
    .tag-item {
        margin: 2px;
    }

    .loading-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 10;
    }

    .menu-button {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(45deg) translate(9px, -18px);
        padding-left: 20px;
        padding-right: 20px;
        z-index: 2;
    }

    .item-wrapper {
        position: static;
    }

    .rest-container {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, .9);
        .rest-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #409eff;

        }
    }

    .reservation-content {
        .title {
            font-size: 18px;
            font-weight: bold;
        }
        .item {
            padding-top: 8px;
            > div {
                padding-top: 8px;
            }
        }
        .el-form-item {
            margin-bottom: 0;
        }
    }

    .reservation-wrapper {
        display: inline-block;
        border: 1px solid #409eff;
        border-radius: 4px;
        padding: 5px 10px;
        margin-bottom: 10px;

        .project-title {
            font-size: 12px;
            color: #409eff;
        }

        .name {
            text-decoration: underline;
            cursor: pointer;
        }
    }
</style>
