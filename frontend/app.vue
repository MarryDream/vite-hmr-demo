<script setup>
import { ref } from "vue";

const count = ref( 0 );
setInterval( () => {
    count.value ++;
}, 1000 );
</script>

<template>
    <div>Wait for the page to refresh: {{ count }}</div>
</template>

<style scoped>
</style>
