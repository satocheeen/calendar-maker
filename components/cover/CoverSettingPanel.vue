<template>
    <PrintOutBtn />

    <v-container fluid>
        設定
    </v-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrintOutBtn from '../common/PrintOutBtn.vue';

export default defineComponent({
    name: 'CoverSettingPanel',
    components: { PrintOutBtn }
});
</script>

<style lang="scss" module></style>
