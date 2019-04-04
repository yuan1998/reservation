<template>

    <div class="project-index-page page-container">
        <div class="table-container"
             v-loading.lock="loading"
             :element-loading-text="loadingText">
            <div class="table-content">
                <SortableTable v-if="projects" :can="permissionArr.update" @end="handleEnd">
                    <el-table row-key="id"
                              ref="table"
                              :data="projects"
                              height="100%"
                              style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column label="ID"
                                         prop="id"
                                         min-width="50">
                        </el-table-column>
                        <el-table-column label="名称"
                                         prop="name"
                                         min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                align="center"
                                label="创建日期"
                                width="180">
                        </el-table-column>
                        <el-table-column label="显示"
                                         v-if="permissionArr.update"
                                         min-width="80">
                            <template slot-scope="scope">
                                <el-switch @change="handleSwitch(scope.row , $event)"
                                           v-loading="scope.row.switchLoading"
                                           :disabled="scope.row.switchLoading"
                                           element-loading-background="rgba(255, 255, 255, 0.4)"
                                           :value="scope.row.display"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="permissionArr.store || permissionArr.update || permissionArr.destroy"
                                         min-width="200"
                                         align="right">
                            <template slot="header" slot-scope="scope">
                                <el-button size="mini"
                                           :loading="saveButtonLoading"
                                           v-if="showSaveButton"
                                           @click="handleSaveOrder">保存
                                </el-button>
                                <el-button v-if="permissionArr.store" size="mini" type="primary" @click="handleEdit">
                                    新建
                                </el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button size="mini"
                                           v-if="permissionArr.update"
                                           @click="handleEdit(scope.row, 'edit')">
                                    Edit
                                </el-button>
                                <el-popover v-if="permissionArr.destroy"
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
                       :title="dialogType === 'new' ? '创建新项目' : '修改项目'"
                       :visible.sync="dialogStatus">
                <el-form :model="form"
                         v-loading="submitLoading"
                         ref="form"
                         :rules="editRule">
                    <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" placeholder="项目名称" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="显示" prop="display" :label-width="formLabelWidth">
                        <el-switch v-model="form.display"></el-switch>
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
    import { mapState, mapActions, mapMutations } from 'vuex';
    import SortableTable                          from '../components/sortable-table';
    import { responseNotify }                     from "../utils/assets";

    const defaultForm = {
        name   : '',
        display: true,
    };

    export default {
        name      : 'project',
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
            }
        },
        computed  : {
            ...mapState('Project', {
                projects: state => state.projects,
            }),
            permissionArr() {
                return {
                    update : this.$hasPermission('project:update'),
                    store  : this.$hasPermission('project:store'),
                    destroy: this.$hasPermission('project:destroy'),
                }
            },
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
        },
        mounted() {
            this.handleGetProject();
        },
        methods   : {

            ...mapMutations({
                setProjects: 'Project/projects',
            }),
            ...mapActions({
                getProjects  : 'Project/projects',
                createProject: 'Project/createProject',
                updateProject: 'Project/updateProject',
                deleteProject: 'Project/deleteProject',
                saveOrder    : 'Project/saveOrder'
            }),
            async handleGetProject() {
                !this.loading && (this.loading = true);
                this.loadingText = '技术研发中...';
                let res          = await this.getProjects();
                this.loading     = false;
            },
            handleEdit(item = {}, type = 'new') {
                this.dialogType = type;

                this.form         = Object.assign({}, defaultForm, item);
                this.dialogStatus = true;
            },
            async handleDelete(item) {
                if (!item.deleteModelLoading) {
                    item.deleteModelLoading = true;
                    await this.handleDeleteProject(item.id);
                    item.deleteModelLoading = false;
                }

            },
            async handleDeleteProject(id) {
                let res = await this.deleteProject(id);
                console.log('res.data :', res.data);
                responseNotify(res);
            },
            handleEnd(arr) {
                this.setProjects(arr);
                (!this.showSaveButton) && (this.showSaveButton = true);
            },
            async handleSaveOrder() {
                this.saveButtonLoading = true;
                let res                = await this.saveOrder();
                this.saveButtonLoading = false;
                this.showSaveButton    = false;
                responseNotify(res);

                console.log('pluckOf(arr , id) :', res);
            },
            handleValidatorForm() {
                if (this.submitLoading) {
                    return;
                }
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        this.dialogType === 'new' ? await this.handleCreate() : await this.handleUpdate();
                        this.submitLoading = false;
                        this.dialogStatus  = false;
                    }
                })
            },
            async handleCreate() {
                let res = await this.createProject(this.form);
                responseNotify(res);
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

                let res = await this.updateProject(data);
                responseNotify(res);

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

            }
        }
    }
</script>

<style>
    .project-index-page .el-switch .el-loading-spinner {
        transform-origin: center;
        transform: scale(.6);
    }
</style>
