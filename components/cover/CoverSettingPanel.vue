<template>
    <PrintOutBtn />

    <v-container fluid>
        <YearSelect />
        <v-divider :class="$style.divider" />

        <FontSettingItemForYear
            label="フォント"
            target="coverTitle"
        />

    </v-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrintOutBtn from '../common/PrintOutBtn.vue';
import YearSelect from '../common/YearSelect.vue';
import FontSettingItemForYear from '../year-calendar/FontSettingItemForYear.vue';

export default defineComponent({
    name: 'CoverSettingPanel',
    components: { PrintOutBtn, YearSelect, FontSettingItemForYear }
});
</script>

<style lang="scss" module>
.divider {
    width: 50%;
    margin: 1em auto;
}

</style>
