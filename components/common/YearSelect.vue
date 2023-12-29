<template>
    <v-text-field label="年" type="number" v-model="currentValue" />
</template>

<script lang="ts">
import { inject } from 'vue';
import { computed, defineComponent } from 'vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'YearSelect',
    setup() {
        const operationStore = inject(OperationStoreKey);

        const currentValue = computed({
            get: () => {
                return operationStore?.yearMonth.value.year ?? new Date().getFullYear();
            },
            set: (val) => {
                if (!operationStore) return;
                operationStore.yearMonth.value.year = Number(val);
            }
        });

        return {
            currentValue,
        }
    }
});
</script>

<style lang="scss" module></style>
