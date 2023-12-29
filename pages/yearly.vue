<template>
    <ClientOnly>
        <CalendarViewLayout>
            <template #calendar>
                <YearCalendarPage :year="year" />
            </template>
            <template #sidebar>
                <YearCalendarSettingPanel />
            </template>
        </CalendarViewLayout>
    </ClientOnly>
</template>

<script lang="ts">
import CalendarViewLayout from '@/components/common/CalendarViewLayout.vue';
import { defineComponent, computed, inject } from 'vue';
import YearCalendarPage from '@/components/year-calendar/YearCalendarPages.vue';
import YearCalendarSettingPanel from '@/components/year-calendar/YearCalendarSettingPanel.vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'YearCalendarView',
    components: { CalendarViewLayout, YearCalendarPage, YearCalendarSettingPanel },
    setup() {
        const operationStore = inject(OperationStoreKey);
        const year = computed({
            get: () => {
                return operationStore?.yearMonth.value.year ?? 0;
            },
            set: (val) => {
                if (!operationStore?.yearMonth.value)
                    return;
                operationStore.yearMonth.value.year = val;
            }
        });
        return {
            year,
        };
    },
});
</script>
