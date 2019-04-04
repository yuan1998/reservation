<template>
    <div class="user-column">
        <template v-if="user">
            <div class="name">
                {{ user.name }}
            </div>
        </template>
        <template v-else>
            用户已经不存在了
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            user: [Object  , null]
        }
    }
</script>

<style scoped>

</style>
