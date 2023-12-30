<template>
    <v-container fluid>
        <YearSelect />
        <v-divider :class="$style.divider" />

        <FontSettingItemForYear
            label="年"
            target="year"
        />

        <FontSettingItemForYear
            label="月"
            target="month"
        />

        <FontSettingItemForYear
            label="日付"
            target="day"
        />

        <DividerSettingItem />
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FontSettingItemForYear from './FontSettingItemForYear.vue';
import DividerSettingItem from './DividerSettingItem.vue';
import YearSelect from '../common/YearSelect.vue';

export default defineComponent({
    name: 'YearCalendarSettingPanel',
    components: { FontSettingItemForYear, DividerSettingItem, YearSelect }
});
</script>

<style lang="scss" module>
.divider {
    width: 50%;
    margin: 1em auto;
}
</style>
