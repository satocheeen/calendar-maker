<template>
    <ClientOnly>
        <CalendarViewLayout>
            <template #calendar>
                <CoverPage />
            </template>
            <template #sidebar>
                <CoverSettingPanel />
            </template>
        </CalendarViewLayout>
    </ClientOnly>    
</template>

<script lang="ts">
import CalendarViewLayout from '@/components/common/CalendarViewLayout.vue';
import { defineComponent } from 'vue';
import CoverPage from '~/components/cover/CoverPage.vue';
import CoverSettingPanel from '~/components/cover/CoverSettingPanel.vue';

export default defineComponent({
    name: 'cover',
    components: { CalendarViewLayout, CoverPage, CoverSettingPanel },
});
</script>

<style lang="scss" module></style>
