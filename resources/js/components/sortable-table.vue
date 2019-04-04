<template>
    <div class="wrapper" ref="wrapper">
        <div class="wrapper" :key="tableKey">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    /*
    only for el-table
    must be used as:
    <SortableTable>
        <el-table ...>
            ...
        </el-table>
    </SortableTable>
    */
    import sortable from "sortablejs";

    export default {
        name   : "SortableTable",
        props  : {
            can: Boolean
        },
        data() {
            return {
                tableKey   : 0,
                scrollTop  : 0,
                watchLoaded: false,
            };
        },
        methods: {
            getScrollTop() {
                return this.$el.querySelector(".el-table__body-wrapper").scrollTop;
            },
            setScrollTop() {
                this.$nextTick(() => {
                    this.$el.querySelector(".el-table__body-wrapper").scrollTop = this.scrollTop;
                })
            },
            makeTableSortAble() {
                let table = this.$el.querySelector(".el-table__body-wrapper tbody");
                if (!table) {
                    return;
                }
                sortable.create(table, {
                    animation: 150,
                    onEnd    : ({ newIndex, oldIndex }) => {
                        this.scrollTop = this.getScrollTop();
                        this.keepWrapperHeight(true);
                        this.tableKey = Math.random();
                        const arr     = this.$children[ 0 ].data;
                        console.log('arr :', arr);
                        const targetRow = arr.splice(oldIndex, 1)[ 0 ];
                        arr.splice(newIndex, 0, targetRow);
                        this.$emit('end', arr)
                    }
                });

                this.watchLoaded && (this.watchLoaded = false);

                if (this.scrollTop) {
                    this.$nextTick(() => {
                        this.setScrollTop()
                    })
                }
            },
            keepWrapperHeight(keep) {
                const wrapper = this.$refs.wrapper;
                let value     = 'auto';
                if (keep) {
                    value = `${wrapper.clientHeight}px`;
                }
                wrapper.style.minHeight = value;
            }
        },
        mounted() {
            this.can && this.makeTableSortAble();
        },
        watch  : {
            tableKey() {
                this.can && this.$nextTick(() => {
                    this.makeTableSortAble();
                    this.keepWrapperHeight(false);
                });
            },

        }
    };
</script>

<style>
    .wrapper {
        height: 100%;
    }
</style>
