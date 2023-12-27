<template>
    <v-card>
        <v-list :items="presets" @click:select="onSelect" :class="$style.list">
            <template v-slot:title="{ item }">
                <PresetBar :preset="item.preset" />
            </template>
            <template v-slot:append="{ item }">
                <v-icon @click.stop="onDelete(item.value)">mdi-delete</v-icon>
            </template>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { type MonthlyColorDefine } from '@/store/types';
import { StyleStoreKey } from '@/store/useStyle';
import { defineComponent, inject, computed } from 'vue';
import PresetBar from './PresetBar.vue';

export default defineComponent({
    name: "PresetSelector",
    components: { PresetBar },
    emits: {
        // eslint-disable-next-line
        select: (preset: MonthlyColorDefine) => true,
        // eslint-disable-next-line
        delete: (index: number) => true,
    },
    setup(_, { emit }) {
        const styleStore = inject(StyleStoreKey);
        const presets = computed(() => {
            return (styleStore?.presets.value ?? []).map((preset, index) => {
                return {
                    value: index,
                    title: '',
                    preset,
                };
            });
        });
        const onSelect = (val: { id: unknown }) => {
            const preset = presets.value[val.id as number].preset;
            emit('select', preset);
        };
        const onDelete = (val: number) => {
            emit('delete', val);
        };
        return {
            presets,
            onSelect,
            onDelete,
        };
    },
});
</script>

<style lang="scss" module>
.list {
    > * {
        display: flex;
    }
}
</style>
