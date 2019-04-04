<template>
    <div class="date-column">
        <div class="relative">
            {{ dateInfo.relative }}
        </div>
        <div class="date">
            {{ dateInfo.date }}
        </div>
        <div class="time">
            {{ dateInfo.time }}
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    moment.locale('zh-cn');

    export default {
        props  : {
            date: String
        },
        data() {
            return {
                dateInfo: {}
            }
        },
        created() {
            this.parseDate();
        },
        methods: {
            parseDate() {
                let mom = moment(this.date);

                this.dateInfo = {
                    date    : mom.format('MM/DD/YYYY'),
                    time    : mom.format('HH:mm'),
                    relative: mom.fromNow()
                }
            }
        }
    }
</script>

<style scoped lang="less">
.relative {
    font-weight: bold;
}
</style>
