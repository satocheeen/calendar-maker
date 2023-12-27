<template>
    <v-text-field label="年" type="number" v-model="currentValue" />
</template>

<script lang="ts">
import { StyleStoreKey } from '@/store/useStyle';
import { inject } from 'vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'YearSelect',
    setup() {
        const styleStore = inject(StyleStoreKey);

        const currentValue = computed({
            get: () => {
                return styleStore?.yearMonth.value.year ?? new Date().getFullYear();
            },
            set: (val) => {
                if (!styleStore) return;
                styleStore.yearMonth.value.year = Number(val);
            }
        });

        return {
            currentValue,
        }
    }
});
</script>

<style lang="scss" module></style>
