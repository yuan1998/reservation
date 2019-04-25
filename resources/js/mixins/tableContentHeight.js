export default {
    computed: {
        tableContentHeight() {
            const { tableContent } = this.$refs;
            console.log('tableContent :', tableContent);
            if (!tableContent) {
                return 750;
            }
            return tableContent.clientHeight || 750;
        },
    }
}
