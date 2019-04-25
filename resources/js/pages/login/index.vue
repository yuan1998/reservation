<template>
    <div class="login-page"
         v-loading.fullscreen.lock="fullscreenLoading"
         :element-loading-text="loadingText">
        <div class="login-wrapper">
            <el-form :model="form"
                     :rules="rules"
                     status-icon
                     ref="form"
                     @submit.native.prevent="submitForm"
                     class="demo-ruleForm">
                <div class="form-title">
                    Login
                </div>
                <el-form-item label="" prop="username">
                    <el-input prefix-icon="el-icon-my-yonghu"
                              type="text"
                              v-model="form.username"
                              placeholder="用户名"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input prefix-icon="el-icon-my-password"
                              type="password"
                              v-model="form.password"
                              placeholder="密码"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="text-align: center;">
                        <el-button type="primary" native-type="submit">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex';


    export default {
        data() {
            return {
                form             : {
                    username: '',
                    password: '',
                },
                rules            : {
                    username: [
                        { required: true, message: '请输入 用户名', trigger: 'blur' },
                        { min: 3, message: '最少3个字符.', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入 密码', trigger: 'blur' },
                        { min: 3, message: '最少3个字符.', trigger: 'blur' }
                    ],
                },
                fullscreenLoading: false,
                loadingText      : '登录长跑....'
            };
        },

        methods: {
            ...mapActions({
                'login': 'Auth/login',
                me     : 'Auth/me',
            }),
            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.handleLogin();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[ formName ].resetFields();
            },
            async handleLogin() {
                this.fullscreenLoading = true;
                let arr                = await this.login(this.form);

                if (arr.code === 1) {
                    this.$notify({
                        type    : 'success',
                        title   : '成功',
                        message : '登录成功',
                        duration: 2000,

                    });
                    this.loadingText = '跳转中...';
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1000)
                }
                else if (arr.message) {
                    this.fullscreenLoading = false;
                    this.$notify.error({
                        title  : '错误!',
                        message: arr.message,
                    });
                    this.form.password = '';
                    this.$refs.form.clearValidate();

                    console.log('arr :', arr);
                }

            }
        }
    }
</script>

<style scoped lang="less">

    .login-page {
        background-color: #f5f5f5;
    }

    .login-wrapper {
        background-color: #fff;
        padding: 20px;
        position: fixed;
        width: 400px;
        border: 1px solid #dadada;
        border-radius: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .form-title {
            font-size: 37px;
            color: #888;
            text-align: center;
            padding-bottom: 20px;
        }

    }
</style>
