<template>
    <ClientOnly>
        <CalendarViewLayout>
            <template #calendar>
                <div id="calendar">
                    <template v-if="currentTab==='month'">
                        <MonthlyCalendar :year="year" :month="month" />
                    </template>
                    <template v-else>
                        <MonthlyCalendar :year="year" :month="n" v-for="n in 12" :key="n" />
                    </template>
                </div>
            </template>
            <template #sidebar>
                <SettingPanel v-model:tab="currentTab" />
            </template>
        </CalendarViewLayout>
    </ClientOnly>
</template>

<script lang="ts">
import MonthlyCalendar from '@/components/monthly-calendar/MonthlyCalendar.vue';
import SettingPanel, { type TabKind } from '@/components/monthly-calendar/setting/SettingPanel.vue';
import { computed, ref } from 'vue';
import { inject } from 'vue';
import { defineComponent } from 'vue';
import CalendarViewLayout from '@/components/common/CalendarViewLayout.vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    components: { MonthlyCalendar, SettingPanel, CalendarViewLayout },
    name: 'CalendarView',
    setup() {
            const currentTab = ref<TabKind>('month');
            const operationStore = inject(OperationStoreKey);

        const year = computed(() => {
            return operationStore?.yearMonth.value.year ?? new Date().getFullYear();
        })

        const month = computed(() => {
            return operationStore?.yearMonth.value.month ?? 1;
        })

        return {
            year,
            month,
            currentTab,
        }
    }
});
</script>
