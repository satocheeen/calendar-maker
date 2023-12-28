<template>
    <div :class="$style.row">
        <font-select
            :label="$props.label"
            v-model:value="currentFontFamily"
        />
        <v-slider
            label="Size"
            thumb-label="always"
            min="0.5"
            max="5"
            step=".1"
            v-model:model-value="currentFontSize"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { type FontDefine } from '@/store/types';
import { computed } from 'vue';
import FontSelect from '../../common/FontSelect.vue';

export default defineComponent({
    name: 'FontSettingItem',
    props: {
        label: {
            type: String,
            required: true,
        },
        target: {
            type: String as PropType<keyof FontDefine>,
            required: true,
        }
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);

        const fontDefine = computed(() => {
            if (!styleStore) return;
            return styleStore.monthlyCommonDefine.value.fonts[props.target];
        })

        const currentFontFamily = computed({
            get() {
                if (!fontDefine.value)
                    return;
                return fontDefine.value?.fontFamily;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateFontFamily(props.target, val);
            }
        });
        const currentFontSize = computed({
            get() {
                if (!fontDefine.value)
                    return;
                return fontDefine.value?.fontSize;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateFontSize(props.target, val);
            }
        });
        return {
            currentFontFamily,
            currentFontSize,
        };
    },
    components: { FontSelect }
});
</script>

<style lang="scss" module>
.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;

    > *:first-child {
        flex: 1.5;
    }
    > * {
        flex: 1;
    }
}

</style>
