<template>
    <div :class="$style.container">
        <v-btn @click="printOut">印刷</v-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PrintOutBtn',
    setup() {
        const printOut = () => {
            window.print();
        }

        return {
            printOut,
        }
    }
});
</script>

<style lang="scss" module>
.container {
    display: flex;
    justify-content: center;
}
</style>
