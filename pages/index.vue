<template>
    <h2 :class="$style.title">Calendar Maker</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Home'
});
</script>

<style lang="scss" module>
.title {
    font-family: 'Zen Maru Gothic';
}
</style>
