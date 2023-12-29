<template>
    <v-text-field label="月" type="number" v-model="currentValue" min="1" max="12"/>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent, inject } from 'vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'MonthSelect',
    setup() {
        const operationStore = inject(OperationStoreKey);

        const currentValue = computed({
            get: () => {
                return operationStore?.yearMonth.value.month ?? 1;
            },
            set: (val) => {
                if (!operationStore) return;
                operationStore.yearMonth.value.month = Number(val);
            }
        });

        return {
            currentValue,
        }
    }
});
</script>

<style lang="scss" module></style>
