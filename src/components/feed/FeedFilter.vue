<template>
    <v-card tile>
            <v-tabs color="#696969" centered >
                <v-tab style="color: #696969"><v-icon class="pr-1">mdi-fire</v-icon>HOT</v-tab>
                <v-tab style="color: #696969"><v-icon class="pr-1">mdi-trending-up</v-icon>TRENDING</v-tab>
                <v-tab style="color: #696969"><v-icon class="pr-1">mdi-clock-outline</v-icon>FRESH</v-tab>
            </v-tabs>
    </v-card>
</template>

<script>
    export default {
        name: "FeedFilter"
    }
</script>

<style scoped>

</style>