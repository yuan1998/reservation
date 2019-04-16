<template>

    <div class="timeline-index-page page-container"
         v-loading.lock="loading"
         :element-loading-text="loadingText">
        <div class="table-container">
            <div class="table-content">
                <SortableTable v-if="timelines" :can="permissionArr.update" @end="handleEnd" :loaded="!!timelines">
                    <el-table row-key="name"
                              ref="table"
                              :data="timelines"
                              height="100%"
                              style="width: 100%">
                        <el-table-column prop="id"
                                         label="编号"
                                         width="55"/>
                        <el-table-column prop="beginTime"
                                         align="center"
                                         label="开始时间"
                                         min-width="180"/>
                        <el-table-column prop="endTime"
                                         align="center"
                                         label="结束时间"
                                         min-width="180"/>
                        <el-table-column prop="created_at"
                                         align="center"
                                         label="创建日期"
                                         width="180"/>
                        <el-table-column min-width="200"
                                         v-if="permissionArr.store || permissionArr.update || permissionArr.destroy"
                                         align="right">
                            <template slot="header" slot-scope="scope">
                                <el-button size="mini"
                                           :loading="saveButtonLoading"
                                           v-if="showSaveButton"
                                           @click="handleSaveOrder">保存
                                </el-button>
                                <el-button v-if="permissionArr.store"
                                           size="mini"
                                           type="primary"
                                           @click="handleEdit">
                                    新建
                                </el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button size="mini"
                                           v-if="permissionArr.update"
                                           @click="handleEdit(scope.row, 'edit')">
                                    Edit
                                </el-button>
                                <el-popover
                                        v-if="permissionArr.destroy"
                                        placement="top"
                                        width="160"
                                        v-model="scope.row.deleteModelShow">
                                    <p>删除后将无法恢复,确认要删除吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text"
                                                   @click="$set(scope.row,'deleteModelShow' , false)">
                                            取消
                                        </el-button>
                                        <el-button type="primary"
                                                   size="mini"
                                                   :loading="scope.row.deleteModelLoading"
                                                   @click="handleDelete(scope.row,scope.$index)">
                                            确定
                                        </el-button>
                                    </div>
                                    <el-button slot="reference"
                                               size="mini"
                                               type="danger">
                                        Delete
                                    </el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                </SortableTable>
            </div>
            <el-dialog v-if="showDialog"
                       :title="dialogType === 'new' ? '创建新时间段' : '修改时间段'"
                       :visible.sync="dialogStatus">
                <el-form :model="form"
                         v-loading="submitLoading"
                         ref="form">
                    <el-form-item label="时间" prop="valueTime" :label-width="formLabelWidth">
                        <el-time-picker
                                is-range
                                v-model="form.valueTime"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogStatus = false">
                        取 消
                    </el-button>
                    <el-button @click="handleValidatorForm"
                               type="primary">
                        确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import moment                                 from 'moment'
    import { mapState, mapActions, mapMutations } from 'vuex';
    import SortableTable                          from '../components/sortable-table';
    import { responseNotify }                     from "../utils/assets";

    const defaultForm = {
        valueTime: [ new Date(2019, 3, 8, 8, 40), new Date(2019, 3, 8, 9, 40) ],
    };

    export default {
        name      : 'timeline',
        components: {
            SortableTable
        },
        data() {
            return {
                form             : defaultForm,
                loading          : true,
                loadingText      : '加载中',
                dialogType       : 'new',
                search           : '',
                dialogFormVisible: false,
                showDialog       : false,
                formLabelWidth   : '120px',
                editRule         : {
                    name: [
                        { required: true, message: '请输入 名称', trigger: 'blur' },
                    ],
                },
                submitLoading    : false,
                showSaveButton   : false,
                saveButtonLoading: false,
                // timelines        : [],
            }
        },
        computed  : {
            ...mapState({
                timelines: state => {
                    return state.Timeline.timelines || [];
                }
            }),
            dialogStatus: {
                get() {
                    return this.dialogFormVisible;
                },
                set(val) {
                    this.showDialog = val;

                    if (val) {
                        this.$nextTick(() => {
                            this.dialogFormVisible = val;
                        })
                    }
                    else {
                        setTimeout(() => {
                            this.dialogFormVisible = val;
                        }, 250);
                    }
                }
            },
            permissionArr() {
                return {
                    update : this.$hasPermission('timeline:update'),
                    store  : this.$hasPermission('timeline:store'),
                    destroy: this.$hasPermission('timeline:destroy'),
                }
            }
        },
        mounted() {
            this.handleGetTimeline();
        },
        methods   : {
            ...mapMutations({
                setTimelines: 'Timeline/timelines',
            }),
            ...mapActions({
                getTimelines  : 'Timeline/getTimelines',
                createTimeline: 'Timeline/createTimeline',
                updateTimeline: 'Timeline/updateTimeline',
                deleteTimeline: 'Timeline/deleteTimeline',
                saveOrder     : 'Timeline/saveOrder'
            }),
            async handleGetTimeline() {
                !this.loading && (this.loading = true);
                this.loadingText = '穿梭时空间隙中...';
                // this.timelines   =
                await this.getTimelines();
                this.loading     = false;
            },
            handleEdit(item = {}, type = 'new') {
                if (item.begin_time) {
                    item = {
                        ...item,
                        valueTime: [ new Date(item.begin_time), new Date(item.end_time) ]
                    }
                }
                this.dialogType   = type;
                this.form         = Object.assign({}, defaultForm, item);
                this.dialogStatus = true;
            },
            async handleDelete(item) {
                if (!item.deleteModelLoading) {
                    item.deleteModelLoading = true;
                    await this.handleDeleteTimeline(item.id);
                    item.deleteModelLoading = false;
                }
            },
            async handleDeleteTimeline(id) {
                let res = await this.deleteTimeline(id);
                responseNotify(res);
                await this.handleGetTimeline();
            },
            async handleEnd(arr) {
                this.setTimelines(arr);
                (!this.showSaveButton) && (this.showSaveButton = true);
                await this.handleGetTimeline();
            },
            async handleSaveOrder() {
                this.saveButtonLoading = true;
                let res                = await this.saveOrder();
                this.saveButtonLoading = false;
                this.showSaveButton    = false;
                responseNotify(res);
                await this.handleGetTimeline();
            },
            handleValidatorForm() {
                if (this.submitLoading) {
                    return;
                }
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        let data           = this.form;
                        this.form          = {
                            ...data,
                            begin_time: moment(data.valueTime[ 0 ]).format('YYYY-MM-DD HH:mm:ss'),
                            end_time  : moment(data.valueTime[ 1 ]).format('YYYY-MM-DD HH:mm:ss'),
                        };

                        this.dialogType === 'new' ? await this.handleCreate() : await this.handleUpdate();
                        this.submitLoading = false;
                        this.dialogStatus  = false;
                    }
                })
            },
            async handleCreate() {
                let res = await this.createTimeline(this.form);
                responseNotify(res);
                await this.handleGetTimeline();
            },
            async handleUpdate(data) {
                data = data || this.form;

                if (!data || !data.id) {
                    app.$notify.error({
                        title   : '错误',
                        message : '发现未知错误 : ID 不存在.',
                        duration: 1000
                    });
                    return;
                }

                let res = await this.updateTimeline(data);
                responseNotify(res);
                await this.handleGetTimeline();

            },
            async handleSwitch(item, display) {
                if (item.switchLoading) {
                    return;
                }

                item.switchLoading = true;
                await this.handleUpdate({
                    id: item.id,
                    display
                });
                item.switchLoading = false;
                await this.handleGetTimeline();

            }
        }
    }
</script>
