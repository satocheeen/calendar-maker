<template>
    <PageLayout orientation="portrait">
        <div :class="$style.container">
            {{ year }}
            Title
        </div>
    </PageLayout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { OperationStoreKey } from '@/store/useOperation';
import PageLayout from '../common/PageLayout.vue';

export default defineComponent({
    name: 'CoverPage',
    components: { PageLayout },
    setup() {
        const operationStore = inject(OperationStoreKey);
        const year = computed(() => {
            return operationStore?.yearMonth.value.year;
        });
        return {
            year,
        };
    },
});
</script>

<style lang="scss" module>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
