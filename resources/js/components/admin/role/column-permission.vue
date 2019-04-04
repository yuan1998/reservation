<template>
    <div class="column-permission">
        <el-tag>{{ item[property] }}</el-tag>
        <el-popover v-if="orItems"
                    tigger="hover"
                    placement="right"
                    width="220"
                    v-model="visible">
            <el-tag class="pop-tag" v-for="each in orItems" :key="each.id"> {{ each[property] }}</el-tag>
            <el-tag type="info" slot="reference">{{ `查看其余${orItems.length}个` }}</el-tag>
        </el-popover>
    </div>
</template>

<script>
    import { cloneOf } from "../../../utils/assets";

    export default {
        props   : {
            items: {
                default(val) {
                    return Array.isArray(val) ? val : [];
                }
            },
            property  : {
                type   : String,
                default: 'text'
            }
        },
        data() {
            return {
                visible: false
            }
        },
        computed: {
            item() {
                let length = this.items.length;
                if (length === 0) {
                    return { id: '无', [ this.property ]: '无' };
                }
                else {
                    return this.items[ 0 ];
                }
            },
            orItems() {
                let length = this.items.length;
                if (length > 1) {
                    let arr = cloneOf(this.items);
                    arr.shift();
                    return arr;
                }
                return false;
            }
        }
    }
</script>

<style scoped lang="less">

    .column-permission {
        white-space: nowrap;
    }

    .pop-tag {
        margin-right: 10px;

    }

</style>
