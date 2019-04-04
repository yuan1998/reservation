<template>
    <div class="user-index-page page-container"
         v-loading.lock="loading"
         :element-loading-text="loadingText">
        <div class="table-container ">
            <div class="table-content">
                <el-table v-if="users"
                          ref="table"
                          :data="users"
                          height="100%"
                          style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
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
                            label="头像"
                            min-width="180">
                        <template slot-scope="scope">
                            <div class="avatar-box">
                                <img class="mc-img" :src="scope.row.avatar || defaultAvatar" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            min-width="180">
                    </el-table-column>
                    <el-table-column label="角色" min-width="180">
                        <template slot-scope="scope">
                            <ColumnPermission :items="scope.row.role"></ColumnPermission>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            min-width="180"
                            label="操作"
                            fixed="right"
                            align="right">
                        <!--<template slot="header" slot-scope="scope">-->
                            <!--<el-input-->
                                    <!--v-model="search"-->
                                    <!--size="mini"-->
                                    <!--placeholder="输入关键字搜索"/>-->
                        <!--</template>-->
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row, 'edit')">
                                Edit
                            </el-button>
                            <el-popover
                                    placement="top"
                                    width="160"
                                    :value="scope.row.show">
                                <p>删除后将无法恢复,确认要删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$set(scope.row,'show' , false)">
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
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-if="showDialog"
                           :title="dialogType === 'new' ? '创建新用户' : '修改用户'"
                           :visible.sync="dialogStatus">
                    <el-form :model="form"
                             v-loading="submitLoading"
                             ref="form"
                             :rules="formRule">
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" placeholder="姓名 (辨识)" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                            <el-input v-model="form.username" placeholder="用户名 (用于登录)" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
                            <el-input v-model="form.password" placeholder="密码 (用于登录)" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword" :label-width="formLabelWidth">
                            <el-input v-model="form.confirmPassword" placeholder="确认密码 " autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="角色列表" :label-width="formLabelWidth">
                            <el-transfer
                                    filterable
                                    filter-placeholder="请输入角色名"
                                    :filter-method="filterMethod"
                                    :props="{
                          key: 'name',
                          label: 'text'
                        }"
                                    :titles="['角色', '拥有角色']"
                                    v-model="form.role"
                                    :data="roles">
                            </el-transfer>
                        </el-form-item>
                        <el-form-item label="权限列表" :label-width="formLabelWidth">
                            <el-transfer
                                    filterable
                                    filter-placeholder="搜索权限"
                                    :filter-method="filterMethod"
                                    :props="{
                                      key: 'name',
                                      label: 'text'
                                    }"
                                    :titles="['权限', '拥有权限']"
                                    v-model="form.permissions"
                                    :data="permissions">
                            </el-transfer>
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
            <div class="table-pagination">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               layout="prev, pager, next"
                               :page-size="pageIndex"
                               :current-page="page"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    import avatar                                 from '../../../images/avatar.png';
    import ColumnPermission                       from '../role/column-permission';
    import { responseNotify, isNumeric, cloneOf } from "../../../utils/assets";

    const defaultForm = {
        name           : '',
        username       : '',
        role           : [],
        permissions    : [],
        password       : '',
        confirmPassword: ''
    };

    export default {
        name      : 'user',
        components: {
            ColumnPermission
        },
        created() {
            if (isNumeric(this.$route.query.page)) {
                this.setPage(parseInt(this.$route.query.page));
            }
        },
        data() {
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading          : true,
                loadingText      : '加载中',
                defaultAvatar    : avatar,
                dialogFormVisible: false,
                showDialog       : false,
                formLabelWidth   : '120px',
                form             : cloneOf(defaultForm),
                dialogType       : 'new',
                search           : '',
                data2            : [],
                newRule          : {
                    username       : [
                        { required: true, message: '请输入 用户名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                    name           : [
                        { required: true, message: '请输入 姓名', trigger: 'blur' },
                        { min: 3, message: '长度最少在 2 个字符', trigger: 'blur' }
                    ],
                    password       : [
                        { required: true, message: '请输入 密码', trigger: 'blur' },
                        { min: 3, message: '长度最少在 3 个字符', trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, message: '请输入 密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
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
                permissions      : [],
                roles            : [],
            }
        },
        mounted() {
            this.handleInit();
            console.log('init :');
        },
        computed  : {
            ...mapState('User', {
                users    : state => state.users,
                pageIndex: state => state.pageIndex,
                page     : state => state.page,
                total    : state => state.total
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
            }
        },
        methods   : {
            ...mapActions({
                getUsers      : 'User/getUsers',
                getRoles      : 'Role/getRoles',
                createUser    : 'User/createUser',
                updateUser    : 'User/updateUser',
                deleteUser    : 'User/deleteUser',
                getPermissions: 'Permission/getPermissions',

            }),
            ...mapMutations({
                setPage: 'User/page'
            }),
            async handleInit() {
                !this.loading && (this.loading = true);

                await this.handleGetUsers();
                await this.handleGetRoles();
                await this.handleGetPermission();
                this.loading = false;
                console.log('this.permissions :', this.permissions);

            },
            async handleGetPermission() {
                this.loadingText = '获取权限机密...';
                this.permissions = await this.getPermissions();
            },
            async handleGetUsers() {
                this.loadingText = '用户报数中...';
                let res          = await this.getUsers();
            },
            async handleGetRoles() {
                this.loadingText = '获取角色机密...';
                this.roles       = await this.getRoles();
            },
            filterMethod(query, item) {
                return (item.text || '').indexOf(query) > -1;
            },
            handleEdit(item = {}, type = 'new') {
                if (this.roles === null) {
                    console.log('角色 加载中');
                    return;
                }
                else if (!this.roles.length) {
                    console.log('没有角色 :');
                    return;
                }
                this.dialogType = type;

                this.form = Object.assign({}, defaultForm, item);

                if (this.form.role && this.form.role.length) {
                    this.form.role = this.form.role.map((each) => {
                        return each.name;
                    });
                }

                if (this.form.permissions && this.form.permissions.length) {
                    this.form.permissions = this.form.permissions.map((each) => {
                        return each.name;
                    });
                }
                this.dialogStatus = true;
            },
            handleValidatorForm() {
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        this.dialogType === 'new' ? await this.handleNewUser() : await this.handleChangeUser();
                        this.submitLoading = false;
                    } else {
                    }
                })
            },
            async handleNewUser() {
                let res = await this.createUser(this.form);

                responseNotify(res, {
                    title  : '成功',
                    message: '添加成功',
                });
                if (res.result) {
                    this.handleGetUsers();
                }

                this.dialogStatus = false;
            },
            async handleChangeUser() {
                let data = this.form;

                if (!data || !data.id) {
                    this.$notify.error({
                        title   : '错误',
                        message : '发现未知错误 : ID 不存在.',
                        duration: 1000
                    });
                    return false;
                }

                let res = await this.updateUser(data);

                responseNotify(res);

                this.dialogStatus = false;
            },
            async handleDelete(item) {
                if (item.deleteModelLoading) {
                    return;
                }
                item.deleteModelLoading = true;
                await this.handleDeleteUser(item.id);
                this.$set(item, 'show', false);
                item.deleteModelLoading = false;

            },
            async handleDeleteUser(id) {
                if (!id) {
                    return;
                }

                if (Array.isArray(id)) {
                    id = id.join(',');
                }

                let res = await this.deleteUser(id);

                responseNotify(res);
                if (res.result) {
                    this.handleGetUsers();
                }
            },
            async handleCurrentChange(val) {
                console.log('val :', val);
                // this.$router.replace({ query: { ...this.$route.query, page: val } });
                this.setPage(val);

                !this.loading && (this.loading = true);
                await this.handleGetUsers();
                this.loading = false;
            },
        }
    }
</script>

<style scoped lang="less">
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
