<template>
    <CalendarViewLayout>
        <template #calendar>
            <YearCalendarPage :year="year" />
        </template>
        <template #sidebar>
            <YearCalendarSettingPanel />
        </template>
    </CalendarViewLayout>
</template>

<script lang="ts">
import CalendarViewLayout from '@/components/common/CalendarViewLayout.vue';
import { StyleStoreKey } from '@/store/useStyle';
import { defineComponent, computed, inject } from 'vue';
import YearCalendarPage from '@/components/year-calendar/YearCalendarPages.vue';
import YearCalendarSettingPanel from '@/components/year-calendar/YearCalendarSettingPanel.vue';

export default defineComponent({
    name: 'YearCalendarView',
    components: { CalendarViewLayout, YearCalendarPage, YearCalendarSettingPanel },
    setup() {
        const styleStore = inject(StyleStoreKey);
        const year = computed({
            get: () => {
                return styleStore?.yearMonth.value.year ?? 0;
            },
            set: (val) => {
                if (!styleStore?.yearMonth.value)
                    return;
                styleStore.yearMonth.value.year = val;
            }
        });
        return {
            year,
        };
    },
});
</script>
