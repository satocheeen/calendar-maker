<template>
    <v-text-field label="月" type="number" v-model="currentValue" min="1" max="12"/>
</template>

<script lang="ts">
import { StyleStoreKey } from '@/store/useStyle';
import { computed } from 'vue';
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'MonthSelect',
    setup() {
        const styleStore = inject(StyleStoreKey);

        const currentValue = computed({
            get: () => {
                return styleStore?.yearMonth.value.month ?? 1;
            },
            set: (val) => {
                if (!styleStore) return;
                styleStore.yearMonth.value.month = Number(val);
            }
        });

        return {
            currentValue,
        }
    }
});
</script>

<style lang="scss" module></style>
