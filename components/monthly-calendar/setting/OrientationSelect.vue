<template>
    <v-select
        label="用紙"
        :items="items"
        item-title="label"
        item-value="value"
        v-model="value"
    >
    </v-select>
</template>

<script lang="ts">
import { type Orientation } from '@/store/types';
import { StyleStoreKey } from '@/store/useStyle';
import { inject } from 'vue';
import { computed } from 'vue';
import { defineComponent } from 'vue';

type Item = {
    value: Orientation,
    label: string;
}
const items: Item[] = [
    {
        value: 'portrait',
        label: '縦向き',
    },
    {
        value: 'landscape',
        label: '横向き（分割）',
    }
]
export default defineComponent({
    name: 'OrientationSelect',
    setup() {
        const store = inject(StyleStoreKey);
        const value = computed<Orientation>({
            get() {
                return store?.monthlyCommonDefine.value.orientation ?? 'landscape';
            },
            set(val) {
                if (!store) return;
                store.monthlyCommonDefine.value.orientation = val;
            }
        })
        return {
            items,
            value,
        }
    }
});
</script>

<style lang="scss" module></style>
