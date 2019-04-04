<template>
    <div class="role-index-page page-container" v-loading.lock="loading" :element-loading-text="loadingText">
        <div class="table-container ">
            <div class="table-content">
                <el-table v-if="roles"
                          :data="roles"
                          height="100%"
                          style="width: 100%">
                    <el-table-column
                            prop="id"
                            align="center"
                            label="编号"
                            min-width="90">
                        <template slot="header" slot-scope="scope">
                            <el-button size="mini" @click="handleEdit()" type="primary">新建</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="text"
                            label="角色名"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="标识"
                            min-width="50">
                    </el-table-column>
                    <el-table-column label="权限" min-width="150">
                        <template slot-scope="scope">
                            <ColumnPermission :items="scope.row.permissions"></ColumnPermission>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            min-width="180"
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row, 'edit')">
                                Edit
                            </el-button>
                            <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="scope.row.show">
                                <p>删除后将无法恢复,确认要删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$set(scope.row,'show' , false)">
                                        取消
                                    </el-button>
                                    <el-button type="primary"
                                               size="mini"
                                               v-loading="scope.row.buttonloading"
                                               @click="handleButtonDelete(scope.row,scope.$index)">
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
                <el-dialog v-if="showDialog"
                           :title="dialogType === 'new' ? '创建新角色' : '修改角色'"
                           :visible.sync="dialogStatus">
                    <el-form :model="form"
                             v-loading="submitLoading"
                             ref="form"
                             :rules="formRule">
                        <el-form-item label="角色名" prop="text" :label-width="formLabelWidth">
                            <el-input v-model="form.text" placeholder="角色名" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="标识" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" placeholder="标识" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-transfer
                                filterable
                                filter-placeholder="请输入权限名称"
                                :filter-method="filterMethod"
                                :props="{
                                    key: 'name',
                                    label: 'text'
                                }"
                                @change="handleChange"
                                :titles="['权限', '拥有权限']"
                                v-model="form.permissions"
                                :data="permissions">
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
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import ColumnPermission         from './column-permission';
    import { responseNotify }       from "../../../utils/assets";

    const defaultForm = {
        name       : '',
        text       : '',
        permissions: [],
    };

    export default {
        name      : 'role',
        components: {
            ColumnPermission
        },
        data() {
            return {
                loading          : true,
                dialogType       : 'new',
                showDialog       : false,
                loadingText      : '加载中',
                dialogFormVisible: false,
                search           : '',
                submitLoading    : false,
                formLabelWidth   : '120px',
                form             : defaultForm,
                newRule          : {
                    name: [
                        { required: true, message: '请输入 标识', trigger: 'blur' },
                        { min: 3, message: '长度最少在 2 个字符', trigger: 'blur' }
                    ],
                    text: [
                        { required: true, message: '请输入 角色名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                },
                editRule         : {
                    name: [
                        { required: true, message: '请输入 标识', trigger: 'blur' },
                        { min: 3, message: '长度最少在 2 个字符', trigger: 'blur' }
                    ],
                    text: [
                        { required: true, message: '请输入 角色名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                },
                permissions      : [],
                roles: [],
            }
        },
        computed  : {
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
            }
        },
        mounted() {
            this.handleInit();
        },
        methods   : {
            ...mapActions({
                getPermissions: 'Permission/getPermissions',
                getRoles      : 'Role/getRoles',
                createRole    : 'Role/createRole',
                updateRole    : 'Role/updateRole',
                deleteRole    : 'Role/deleteRole',
            }),
            async handleInit() {
                !this.loading && (this.loading = true);
                this.loadingText = '获取机密中..';
                await this.handleGetRoles();
                this.loadingText = '解析机密中..';
                 await this.handleGetPermission();
                this.loading = false;
            },
            async handleGetRoles() {
                this.roles = await this.getRoles();
            },
            async handleGetPermission() {
                this.permissions = await this.getPermissions();
                // console.log('res :', res);
            },
            handleEdit(item = {}, type = 'new') {
                if (this.permissions === null) {
                    console.log('角色 加载中');
                    return;
                }
                else if (!this.permissions.length) {
                    console.log('没有角色 :');
                    return;
                }
                this.dialogType = type;

                this.form = Object.assign({}, defaultForm, item);

                console.log('this.form.permissions :', this.form);
                if (this.form.permissions && this.form.permissions.length) {
                    this.form.permissions = this.form.permissions.map((each) => {
                        return each.name;
                    });
                }
                this.dialogStatus = true;
            },
            rangePermission(arr) {
                return arr && arr.length ? arr : [ {
                    id  : '无',
                    text: '无',
                } ]
            },
            handleValidatorForm() {
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid && !this.submitLoading) {
                        this.submitLoading = true;
                        this.dialogType === 'new' ? await this.handleCreate() : await this.handleUpdate();
                        this.submitLoading = false;
                        this.dialogStatus  = false;
                    }
                });
            },
            async handleCreate() {
                let res = await this.createRole(this.form);

                responseNotify(res);

            },
            async handleUpdate() {
                let data = this.form;
                if (!data || !data.id) {
                    this.$notify.error({
                        title   : '错误',
                        message : '发现未知错误 : ID 不存在.',
                        duration: 1000
                    });
                    return;
                }

                let res = await this.updateRole(data);
                responseNotify(res);

            },
            filterMethod(query, item) {
                return (item.text || '').indexOf(query) > -1;
            },
            handleChange(val, type, key) {
                console.log('val :', val);
                console.log('type :', type);
                console.log('key :', key);
            },
            async handleDestroyItem(id) {
                let res = await this.deleteRole(id);
                responseNotify(res);
            },
            handleButtonDelete(item) {
                this.$set(item, 'buttonloading', true);
                this.handleDestroyItem(item.id);
            }
        }
    }
</script>

<style scoped>

</style>
