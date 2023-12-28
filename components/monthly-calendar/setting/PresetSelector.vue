<template>
    <v-card>
        <client-only>
            <ul>
                <li
                    v-for="(item, index) in presets"
                    :key="index"
                    :class="$style.item"
                    @click="onSelect(index)"
                >
                    <div :class="$style.defaultArea">
                        <v-icon v-if="item.isDefault" color="secondary">
                            mdi-star
                        </v-icon>
                    </div>

                    <PresetBar :preset="item.preset" />

                    <div :class="$style.iconArea">
                        <span v-if="!item.isDefault">
                            <v-tooltip text="デフォルト値に設定">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props" @click.stop="onChangeDefaultPreset(index)">
                                        mdi-star
                                    </v-icon>
                                </template>
                            </v-tooltip>

                            <v-tooltip text="削除">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props" @click.stop="onDelete(index)"  v-if="!item.isDefault">
                                        mdi-delete
                                    </v-icon>
                                </template>
                            </v-tooltip>
                        </span>
                    </div>
                </li>
            </ul>
        </client-only>
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
            return (styleStore?.presets.value.presets ?? []).map((preset, index) => {
                return {
                    preset,
                    isDefault: index === styleStore?.presets.value.defaultIndex,
                }
            });
        })

        const onSelect = (index: number) => {
            const preset = presets.value[index];
            emit('select', preset.preset);
        };
        const onDelete = (index: number) => {
            emit('delete', index);
        };
        const onChangeDefaultPreset = (index: number) => {
            if (!styleStore) return;
            styleStore.presets.value.defaultIndex = index;
        }

        return {
            presets,
            onSelect,
            onDelete,
            onChangeDefaultPreset,
        };
    },
});
</script>

<style lang="scss" module>
.item {
    display: flex;
    padding: 5px;
    align-items: center;
    justify-content: space-between;
    color: #777;

    &:hover {
        background-color: #ddd;
    }
}

.defaultArea {
    display: inline-flex;
    width: 1.5rem;
    font-size: 80%;
}

.iconArea {
    display: inline-flex;
    width: 3rem;
}

</style>
