<template>
    <v-card :class="$style.card">
        <v-card-title>区切り線</v-card-title>
        <v-card-text>
            <div :class="$style.container">
                <v-slider
                    :class="$style.size"
                    label="Size(%)"
                    thumb-label="always"
                    min="0"
                    max="100"
                    step="5"
                    v-model:model-value="size"
                />
                <v-slider
                    :class="$style.width"
                    label="Width"
                    thumb-label="always"
                    min=".1"
                    max="1"
                    step=".1"
                    v-model:model-value="width"
                />
                <v-text-field
                    type="color"
                    :class="$style.color"
                    v-model:model-value="color"
                />
                <v-select
                    label="線種"
                    :items="['solid', 'double', 'dashed','dotted']"
                    :class="$style.borderStyle"
                    v-model:model-value="style"
                />
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { StyleStoreKey } from '@/store/useStyle';
import { defineComponent, inject, computed } from 'vue';

export default defineComponent({
    name: 'DividerSettingItem',
    setup() {
        const styleStore = inject(StyleStoreKey);
        
        const width = computed({
            get() {
                return styleStore?.yearlyDefine.value.divider?.width ?? 50;
            },
            set(val) {
                if (!styleStore) return;
                styleStore.yearlyDefine.value.divider.width = val;
            }
        })

        const size = computed({
            get() {
                return styleStore?.yearlyDefine.value.divider?.size ?? 50;
            },
            set(val) {
                if (!styleStore) return;
                styleStore.yearlyDefine.value.divider.size = val;
            }
        })

        const color = computed({
            get() {
                return styleStore?.yearlyDefine.value.divider?.color;
            },
            set(val) {
                if (!styleStore) return;
                styleStore.yearlyDefine.value.divider.color = val;
            }
        })

        const style = computed({
            get() {
                return styleStore?.yearlyDefine.value.divider?.style ?? 'solid';
            },
            set(val) {
                if (!styleStore) return;
                styleStore.yearlyDefine.value.divider.style = val;
            }
        })

        return {
            size,
            width,
            color,
            style,
        }
    }
});
</script>

<style lang="scss" module>
.card {
    margin: 10px 0;
}
.container {
    display: grid;

    .width {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    .size {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    .color {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }
    .borderStyle {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
}
</style>
