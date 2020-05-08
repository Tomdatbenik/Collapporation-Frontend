<template>
    <v-chip  color="#EBE9E9" class="ml-1 like-button" v-if="liked">
        <v-icon color="#696969" class="mr-2">mdi-thumb-up</v-icon> {{ likes }}
    </v-chip>
    <v-chip  color="#EBE9E9" class="ml-1 like-button" v-else>
        <v-icon color="#696969" class="mr-2">mdi-thumb-up-outline</v-icon> {{ likes }}
    </v-chip>
</template>

<script>
    export default {
        name: "LikeButton",
        props: {
            likes: Number
        },
        data() {
            return {
                liked: true
            }
        }
    }
</script>

<style scoped>
    .like-button {
        color: #696969;
    }
</style>