<template>
    <div class="activity-index-page page-container">
        <div class="table-container " :element-loading-text="loadingText" v-loading.lock="loading">
            <div class="table-content" v-if="activities">
                <el-table ref="table"
                          :data="activities"
                          height="100%"
                          style="width: 100%">
                    <el-table-column label="操作时间" min-width="180" fixed>
                        <template slot-scope="scope">
                            <DateColumn :date="scope.row.created_at"></DateColumn>
                        </template>
                    </el-table-column>


                    <el-table-column
                            prop="description"
                            label="描述"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="模型"
                            min-width="180">
                        <template slot-scope="scope">
                            {{ logName[scope.row.log_name] || scope.row.log_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作用户" min-width="180">
                        <template slot-scope="scope">
                            <UserColumn :user="scope.row.causer"></UserColumn>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ip"
                            label="IP"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="method"
                            label="请求方法"
                            width="180">
                    </el-table-column>

                    <el-table-column fixed="right"
                                     label="其他"
                                     min-width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="handleOpenInfo(scope.row)">查看详细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :visible.sync="showDialog" title="详细">
                    <div class="dialog-content" v-if="currentData && currentData.id">
                        <el-form>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="Id">
                                        {{ currentData.id }}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="模型">
                                        {{ currentData.log_name }}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="操作人员 ID">
                                        {{ currentData.causer_id }}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24" v-if="currentData.properties">
                                    <div class="title">属性</div>
                                    <json-viewer
                                            :value="currentData.properties"
                                            :expand-depth='5'
                                            copyable
                                            boxed
                                            sort></json-viewer>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>

                </el-dialog>
            </div>
            <div class="table-pagination">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               layout="prev, pager, next"
                               :page-size="pageIndex"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex';
    import JsonViewer                             from 'vue-json-viewer'

    import avatar     from '../../images/avatar.png';
    import UserColumn from './components/UserColumn';
    import DateColumn from './components/DateColumn';

    const defaultForm = {
        name       : '',
        project    : [],
        avatar     : '',
        description: '',
        data       : null,
    };

    export default {
        name      : 'activities',
        components: {
            UserColumn,
            DateColumn,
            JsonViewer
        },
        data() {
            return {
                form         : defaultForm,
                defaultAvatar: avatar,
                loading      : true,
                loadingText  : '加载记录中',
                currentData  : {},
                showDialog   : false,
            }
        },
        async mounted() {
            await this.handleGetActivity();
        },
        computed  : {
            ...mapState('Activity', {
                meta       : state => state.meta,
                activities : state => state.activities,
                currentPage: state => state.currentPage,
                pageIndex  : state => state.pageIndex,
            }),
            total() {
                return this.meta ? this.meta.total : 0;
            },
            logName() {
                return {
                    'rest'         : '医生休息模块',
                    'expert'       : '医生模块',
                    'project'      : '项目模块',
                    'reservation'  : '预约模块',
                    'timeline'     : '时间段模块',
                    'user'         : '用户模块',
                    'expertProject': '医生关联项目模块',
                }
            }
        },
        methods   : {
            ...mapActions({
                getActivity: 'Activity/getActivity',
            }),
            ...mapMutations({
                setCurrentPage: 'Activity/currentPage'
            }),
            handleOpenInfo(item) {
                this.currentData = item;
                this.showDialog  = true;
            },
            async handleGetActivity() {
                !this.loading && (this.loading = true);
                let res      = await this.getActivity();
                this.loading = false;
                console.log('this.activities :', this.activities);
            },
            filterMethod(query, item) {
                return (item.text || '').indexOf(query) > -1;
            },
            handleCurrentChange(val) {
                this.setCurrentPage(val);
                this.handleGetActivity();
            },
        }
    }
</script>

<style scoped>
    .avatar-box {
        height: 60px;
        width: 60px;
        margin: 5px;
        border-radius: 100%;
        overflow: hidden;
        border: 5px solid #fff;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    }

</style>
