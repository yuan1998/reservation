<template>
    <div class="reservation-page page-container">
        <div class="table-container"
             v-loading.lock="loading"
             :element-loading-text="loadingText">
            <div class="table-header">
                <div>
                    <el-date-picker
                            v-model="dateTime"
                            align="right"
                            type="date"
                            size="mini"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="handleDateTimeChange"
                            :picker-options="pickerOptions1">
                    </el-date-picker>

                    <el-select size="mini"
                               v-model="project"
                               @change="handleChangeProject"
                               placeholder="请选择">
                        <el-option label="全部" value=""/>
                        <el-option v-for="item in projects"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id"/>
                    </el-select>
                </div>

            </div>
            <div v-if="!loading" class="table-content">
                <el-table row-key="id"
                          ref="table"
                          border
                          :data="getData"
                          height="100%"
                          style="width: 100%">
                    <el-table-column prop="name"
                                     label=""
                                     align="center"
                                     fixed
                                     min-width="100"/>
                    <el-table-column v-for="(item , index) in timelines"
                                     :key="index"
                                     align="center"
                                     min-width="150"
                                     :label="`${item.beginTime} - ${item.endTime}`">
                        <template slot-scope="scope">
                            <MyColumn :item="scope.row"
                                      :id="item.id"
                                      :project="projectItem"
                                      :dateTime="dateTime"
                                      :rests="restDate"
                                      :timelines="timelines"
                                      :reservations="reservationData"
                                      @get-rests="handleColumnGetRest"
                                      @get-reservation="handleColumnGetReservation"
                                      @reservation="handleColumnReservation"/>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-if="showDialog"
                           @open="handleDialogOpen"
                           :title="dialogType === 'new' ? '创建新项目' : '修改项目'"
                           :visible.sync="dialogStatus">
                    <el-form :model="form"
                             v-loading="submitLoading"
                             ref="form"
                             :rules="editRule">
                        <el-form-item label="客户姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" placeholder="姓名" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
                            <el-input type="number" v-model="form.age" placeholder="年龄" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
                            <el-input type="number" v-model="form.phone" placeholder="" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.sex">
                                <el-radio-button label="男"></el-radio-button>
                                <el-radio-button label="女"></el-radio-button>
                                <el-radio-button label="未知"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <div v-loading.lock="formDateLoading">
                            <el-form-item label="预约日期" :label-width="formLabelWidth">
                                <el-col :span="18">
                                    <el-form-item prop="date">
                                        <el-date-picker v-model="form.date"
                                                        type="datetime"
                                                        placeholder="选择日期时间"
                                                        style="width: 100%;"
                                                        @change="handleFormDateChange"/>
                                    </el-form-item>
                                </el-col>
                                <!--<el-col class="line" :span="2">-</el-col>-->
                                <!--<el-col :span="11">-->
                                <!--<el-form-item prop="timeline_id">-->
                                <!--<el-select v-model="form.timeline_id"-->
                                <!--style="width: 100%;"-->
                                <!--placeholder="选择预约时间">-->
                                <!--<el-option label="请选择" value=""/>-->
                                <!--<el-option v-for="(item , index) in formTimeline"-->
                                <!--:key="index"-->
                                <!--:disabled="item.disabled"-->
                                <!--:label="`${item.beginTime} - ${item.endTime}`"-->
                                <!--:value="item.id"/>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--</el-col>-->
                            </el-form-item>
                            <el-form-item label="医生/项目" :label-width="formLabelWidth">
                                <el-col :span="11">
                                    <el-form-item prop="expert_id">
                                        <el-select v-model="form.expert_id"
                                                   style="width: 100%;"
                                                   placeholder="选择预约医生">
                                            <el-option label="请选择" value=""/>
                                            <el-option v-for="(item , index) in formExpert"
                                                       :key="index"
                                                       :disabled="item.disabled"
                                                       :label="item.name"
                                                       :value="item.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-form-item prop="project_id" v-if="form.expert_id">
                                        <el-select v-model="form.project_id"
                                                   style="width: 100%;"
                                                   placeholder="选择预约项目">
                                            <el-option label="请选择" value=""/>
                                            <el-option v-for="(item , index) in formProject"
                                                       :key="index"
                                                       :label="item.name"
                                                       :value="item.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </div>
                        <el-form-item label="备注"
                                      prop="description"
                                      :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button @click="handleValidatorForm"
                                   type="primary">
                            确 定
                        </el-button>
                        <el-button @click="dialogStatus = false">
                            取 消
                        </el-button>

                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import moment                                             from 'moment'
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import MyColumn                                           from '../components/admin/reseravtion-column';
    import { oneOf, responseNotify, hasTime }                 from "../utils/assets";

    const today       = moment().format('YYYY-MM-DD');
    const defaultForm = {
        name       : '',
        age        : '',
        phone      : '',
        sex        : '女',
        description: "",
        remark     : '',
        timeline_id: '',
        project_id : '',
        expert_id  : '',
        date       : moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    export default {
        name      : 'reservation',
        components: {
            MyColumn,
        },
        created() {
            let result = this.$hasPermission('reservation:table');

            if (!result) {
                this.$notify({
                    type   : 'warning',
                    content: '你没有权限',
                    title  : '警告'
                });
                this.$router.push('/');
            }
        },
        data() {
            const validatePhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('电话不能为空'));
                }
                else {
                    if (!/^1[34578]\d{9}$/.test(value)) {
                        callback('请输入正确的电话号码');

                    } else {
                        callback();
                    }
                }
            };
            let dateTime        = this.$route.query.date || today;

            return {
                dateTime,
                form             : defaultForm,
                project          : '',
                expert           : '',
                loading          : true,
                loadingText      : '加载中..',
                pickerOptions1   : {
                    shortcuts: [ {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    } ]
                },
                dialogType       : 'new',
                dialogFormVisible: false,
                showDialog       : false,
                formLabelWidth   : '120px',
                editRule         : {
                    name       : [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ],
                    age        : [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    phone      : [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    sex        : [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    date       : [
                        { required: true, message: '请选择日期', trigger: 'blur' },
                    ],
                    timeline_id: [
                        { required: true, message: '请选择时间', trigger: 'blur' },
                    ],
                    expert_id  : [
                        { required: true, message: '请选择医生', trigger: 'blur' },
                    ],
                    project_id : [
                        { required: true, message: '请选择项目', trigger: 'blur' },
                    ],
                },
                newRule          : {
                    name: [
                        { required: true, message: '请输入 名称', trigger: 'blur' },
                    ],
                },
                submitLoading    : false,
                formDateLoading  : false,
                projects         : [],
                experts          : [],
                timelines        : [],
                restDate         : [],
                reservationData  : [],
                formRests        : [],
            }
        },
        mounted() {
            this.handleInit();
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
                return this[ `${this.dialogType}Rule` ] || {};
            },
            projectExpert() {
                let result = this.experts;
                if (this.project) {
                    let id = this.project;
                    result = this.experts.filter((item) => {
                        return oneOf(id, item.project_id);
                    });
                }
                return result;
            },
            formProject() {
                let { expert_id: id, project_id } = this.form;
                if (id) {
                    let item = this.allExpertOfId(id);
                    if (item) {
                        if (project_id && !oneOf(project_id, item.project_id)) {
                            this.form.project_id = '';
                        }
                        return this.projects.filter((a) => oneOf(a.id, item.project_id));
                    }
                }

                return [];
            },
            getData() {
                let result = this.projectExpert;

                if (this.expert) {
                    let { id } = this.expert;

                    result = this.experts.filter((item) => {
                        return item.id === id;
                    });
                }

                return result;
            },
            formExpert() {
                let { expert_id } = this.form;
                let rests         = this.handleGetFormDateRestId('timeline_id', 'expert_id') || [];

                return !rests.length ? this.experts
                    : this.experts.map((item) => {
                        let condition = oneOf(item.id, rests);
                        item.disabled = condition;
                        if (condition) {
                            item.disabled = true;
                            if (expert_id === item.id) {
                                this.form.expert_id = '';
                            }
                        }
                        return item;
                    });

            },
            formTimeline() {
                let { timeline_id } = this.form;
                let rests           = this.handleGetFormDateRestId('expert_id', 'timeline_id') || [];

                return (this.timelines || []).map((item) => {
                    let condition = oneOf(item.id, rests);
                    item.disabled = condition;
                    if (condition) {
                        if (timeline_id === item.id) {
                            this.form.timeline_id = '';
                        }
                    }

                    return item;
                })
            },
            projectItem() {
                return (this.projects || []).find((item) => {
                    return item.id === this.project;
                })
            }
        },
        methods   : {
            ...mapActions({
                // 获取 预约
                reservationDateData: 'Reservation/reservationDateData',
                // 获取医生 休息
                getRestOfData      : 'Rest/getRestOfData',
                // 获取 时间段
                getTimeline        : 'Timeline/getTimelines',
                // 获取 医生
                getExpert          : 'Expert/getAllExperts',
                // 获取 项目
                getProject         : 'Project/getProject',

                addDateReservation: 'Reservation/addDateReservation',
                updateReservation : 'Reservation/updateReservation',
            }),
            allExpertOfId(id) {
                if (this.experts.length === 0) {
                    return null;
                }
                return this.experts.find((item) => item.id === id);
            },
            getRestOfDate(date) {
                return this.restDate[ date ];
            },
            handleGetFormDateRestId(a, b) {
                let id;
                if (a === 'timeline_id') {
                    let item = hasTime(this.form.date);
                    // this.hasTime(this.form.date);
                    console.log('item :', item);
                    id = item ? item.id : 0;
                }
                else {
                    id = this.form[ a ];
                }
                let rests = [];

                if (!id) {
                    return [];
                }

                this.formRests.forEach((item) => {
                    if (item[ a ] === id) {
                        rests.push(item[ b ]);
                    }
                });
                return rests;
            },
            async handleFormDateChange(value) {
                if (value) {
                    await this.handleFormRest(value);
                    this.hasTimelineOrRest(value);
                }
            },
            hasTimelineOrRest(value) {
                value = value || this.form.date;
                if (!value) {
                    return;
                }

                let item = hasTime(value);
                if (!item) {
                    this.form.timeline_id = undefined;
                    this.$alert('这个时间段没有上班', '提示', {
                        confirmButtonText: '确定',
                    });
                }
                else {
                    this.form.timeline_id = item.id;
                }
            },

            async handleFormRest(date) {
                this.formDateLoading = true;
                this.formRests       = await this.getRestOfData({ date });
                this.formDateLoading = false;
            },
            loadInto(duration = 250) {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, duration);
            },
            handleChangeExpert(item) {
                this.loadInto(1000);
                this.expert = item;
            },
            handleChangeProject(item) {
                this.loadInto(300);
                if (this.expert && !oneOf(item.id, this.expert.project_id)) {
                    this.expert = '';
                }
            },
            async handleInit() {
                !this.loading && (this.loading = true);
                this.loadingText = '正在加载时间段..';
                this.timelines   = await this.getTimeline();
                this.loadingText = '正在加载项目..';
                this.projects    = await this.getProject();
                this.loadingText = '正在加载医生..';
                this.experts     = await this.getExpert();
                await this.handleDateInfo();
                this.loading = false;
            },
            async handleDateInfo() {

                await this.handleGetReservation(this.dateTime);
                await this.handleGetRest(this.dateTime);
            },
            handleColumnGetRest() {
                this.handleGetRest(this.dateTime);
            },
            handleColumnGetReservation() {
                this.handleGetReservation(this.dateTime);
            },
            async handleGetReservation(date) {
                this.loadingText     = '正在加载当天预约信息..';
                this.reservationData = await this.reservationDateData({ date });
            },
            async handleGetRest(date) {
                this.loadingText = '正在加载当天医生休息情况..';
                this.restDate    = await this.getRestOfData({ date });
            },
            async handleSearch() {
                !this.loading && (this.loading = true);
                this.loading = false;
            },
            async handleColumnReservation(type, item) {
                this.dialogType   = type;
                this.form         = Object.assign({}, defaultForm, item);
                this.dialogStatus = true;
            },
            handleValidatorForm() {
                let form = this.$refs.form;
                form.validate(async (valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        this.dialogType === 'new' ? await this.handleNewReservation() : await this.handleChangeReservation();
                        this.submitLoading = false;
                        this.dialogStatus  = false;
                    }
                })
            },
            async handleDateTimeChange(value) {
                if (value && !this.loading) {
                    this.$router.replace({ query: { ...this.$route.query, date: this.dateTime } });
                }
            },
            async handleNewReservation() {
                let res = await this.addDateReservation(this.form);
                this.handleGetReservation();
                responseNotify(res);
            },
            async handleChangeReservation() {
                let res = await this.updateReservation(this.form);
                this.handleGetReservation(this.dateTime);
                responseNotify(res);
            },
            async handleDialogOpen() {
                if (this.form && this.form.date) {
                    await this.handleFormRest(this.form.date);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .line {
        text-align: center;
    }
</style>
