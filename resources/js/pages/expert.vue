<template>
    <div class="expert-index-page page-container">
        <div class="table-container " :element-loading-text="loadingText" v-loading.lock="loading">
            <div class="table-content">
                <el-table v-if="experts"
                          ref="table"
                          :data="experts"
                          height="100%"
                          style="width: 100%">
                    <el-table-column
                            prop="id"
                            align="center"
                            label="编号"
                            min-width="90">
                        <template slot="header">
                            <div>
                                <el-button v-if="expertPermission.store" size="mini" @click="handleEdit()"
                                           type="primary">新建
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            min-width="180">
                    </el-table-column>
                    <el-table-column label="负责项目" min-width="180">
                        <template slot-scope="scope">
                            <ColumnPermission :property="'name'" :items="scope.row.project"></ColumnPermission>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            v-if="expertPermission.update || expertPermission.destroy"
                            fixed="right"
                            label="操作"
                            align="right">
                        <template slot-scope="scope">
                            <div>
                                <el-button
                                        v-if="expertPermission.update"
                                        size="mini"
                                        @click="handleEdit(scope.row, 'edit')">
                                    Edit
                                </el-button>
                                <el-popover placement="top"
                                            trigger="click"
                                            width="160"
                                            v-if="expertPermission.destroy"
                                            :value="scope.row.show">
                                    <p>删除后将无法恢复,确认要删除吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button size="mini" type="text"
                                                   @click="$set(scope.row,'show' , false)">
                                            取消
                                        </el-button>
                                        <el-button type="primary"
                                                   :loading="scope.row.deleteModelLoading"
                                                   size="mini"
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
                            </div>

                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-if="showDialog"
                           :title="dialogType === 'new' ? '创建新医生' : '修改医生'"
                           :visible.sync="dialogStatus">
                    <el-form :model="form"
                             v-loading="submitLoading"
                             ref="form"
                             :rules="formRule">
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" placeholder="姓名 (辨识)" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
                            <el-input v-model="form.description"
                                      placeholder="描述"
                                      type="textarea"
                                      autocomplete="off"/>
                        </el-form-item>
                        <el-transfer filterable
                                     filter-placeholder="请输入项目"
                                     :filter-method="filterMethod"
                                     :props="{
                                      key: 'id',
                                      label: 'name'
                                    }"
                                     :titles="['项目', '负责项目']"
                                     v-model="form.project"
                                     :data="displayProject">
                        </el-transfer>

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
            <div class="table-pagination">
                <el-pagination background
                               @size-change="handleSizeChange"
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
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
    import avatar                                             from '../images/avatar.png';
    import ColumnPermission                                   from '../components/admin/role/column-permission'
    import { responseNotify }                                 from "../utils/assets";

    const defaultForm = {
        name       : '',
        project    : [],
        avatar     : undefined,
        description: undefined,
        data       : null,
    };

    export default {
        name      : 'expert',
        components: {
            ColumnPermission
        },
        data() {
            return {
                form             : defaultForm,
                defaultAvatar    : avatar,
                loading          : true,
                loadingText      : '加载中',
                dialogType       : 'new',
                search           : '',
                dialogFormVisible: false,
                showDialog       : false,
                formLabelWidth   : '120px',
                newRule          : {
                    username: [
                        { required: true, message: '请输入 用户名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                    name    : [
                        { required: true, message: '请输入 姓名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 2 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入 密码', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                },
                editRule         : {
                    username: [
                        { required: true, message: '请输入 用户名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                    name    : [
                        { required: true, message: '请输入 姓名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                },
                submitLoading    : false,
                // projects         : [],
            }
        },
        async mounted() {
            this.handleInit();
        },
        computed  : {
            ...mapState('Expert', {
                total    : state => state.total,
                experts  : state => state.allExperts,
                pageIndex: state => state.pageIndex,
            }),
            ...mapGetters({
                displayProject: 'Project/displayProject',
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
            formRule() {
                return this[ `${this.dialogType}Rule` ];
            },
            expertPermission() {
                return {
                    update : this.$hasPermission('expert:update'),
                    destroy: this.$hasPermission('expert:destroy'),
                    store  : this.$hasPermission('expert:store'),
                }
            }
        },
        methods   : {
            ...mapActions({
                getExperts  : 'Expert/getExperts',
                getProjects : 'Project/getProject',
                createExpert: 'Expert/createExpert',
                updateExpert: 'Expert/updateExpert',
                deleteExpert: 'Expert/deleteExpert',
            }),
            ...mapMutations({
                setPage: 'Expert/page'
            }),
            async handleInit() {
                !this.loading && (this.loading = true);
                await this.handleGetExperts();
                await this.handleGetProjects();
                this.loading = false;
            },
            async handleGetExperts() {
                this.loadingText = '医生报数中...';
                await this.getExperts();
            },
            async handleGetProjects() {
                this.loadingText = '项目计算中...';
                // this.projects    =
                await this.getProjects();
            },
            handleChange(value, type, key) {
            },
            filterMethod(query, item) {
                return (item.text || '').indexOf(query) > -1;
            },
            handleEdit(item = {}, type = 'new') {
                this.dialogType = type;

                this.form = Object.assign({}, defaultForm, item);

                console.log('this,form :', this.form);
                if (this.form.project && this.form.project.length) {
                    this.form.project = this.form.project.map((each) => {
                        return each.id;
                    });
                }
                this.dialogStatus = true;
            },
            handleValidatorForm() {
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        this.dialogType === 'new' ? await this.handleNewExpert() : await this.handleChangeExpert();
                        this.submitLoading = false;
                    }
                })
            },
            async handleNewExpert() {
                let res = await this.createExpert(this.form);
                responseNotify(res);
                if (res.result) {
                    this.handleGetExperts();
                }
                this.dialogStatus = false;
            },
            async handleChangeExpert() {
                let data = this.form;
                if (!data || !data.id) {
                    app.$notify.error({
                        title   : '错误',
                        message : '发现未知错误 : ID 不存在.',
                        duration: 1000
                    });
                    return false;
                }

                let res = await this.updateExpert(data);

                responseNotify(res);
                this.dialogStatus = false;
            },
            async handleDelete(item) {
                if (item.deleteModelLoading) {
                    return;
                }
                item.deleteModelLoading = true;
                await this.handleDeleteExpert(item.id);
                this.$set(item, 'show', false);
                item.deleteModelLoading = false;
            },
            async handleDeleteExpert(id) {
                if (!id) {
                    return;
                }

                if (Array.isArray(id)) {
                    id = id.join(',');
                }

                let res = await this.deleteExpert(id);
                responseNotify(res);

                if (res.result) {
                    this.handleGetExperts();
                }
            },
            handleSizeChange() {

            },
            handleCurrentChange(val) {
                this.setPage(val);
                this.handleGetExperts();
            },
            handleSelectionChange(a) {
                // console.log('this.$refs.table :', this.$refs.table.selection);
            }
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
