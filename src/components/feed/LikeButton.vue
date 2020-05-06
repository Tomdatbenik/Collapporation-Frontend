<template>
    <v-chip  color="#EBE9E9" class="ml-1 like-button" v-if="liked">
        <v-icon color="#696969" class="mr-2">mdi-thumb-up</v-icon> {{ count }}
    </v-chip>
    <v-chip  color="#EBE9E9" class="ml-1 like-button" v-else>
        <v-icon color="#696969" class="mr-2">mdi-thumb-up-outline</v-icon> {{ count }}
    </v-chip>
</template>

<script>
    export default {
        name: "LikeButton",
        data() {
            return {
                liked: true,
                count: 0
            }
        }
    }
</script>

<style scoped>
    .like-button {
        color: #696969;
    }
</style>