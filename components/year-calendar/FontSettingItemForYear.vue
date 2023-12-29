<template>
    <v-card :class="$style.card">
        <v-card-title>{{ $props.label }}</v-card-title>
        <v-card-text>
            <div :class="$style.container">
                <font-select
                    :class="$style.fontFamily"
                    label="フォント"
                    v-model="currentFontFamily"
                />
                <v-slider
                    :class="$style.fontSize"
                    label="Size"
                    thumb-label="always"
                    min="0.5"
                    max="5"
                    step=".1"
                    v-model="currentFontSize"
                />
                <v-text-field
                    type="color"
                    :label="$props.target==='day' ? '平日' : ''"
                    :class="$style.fontColor"
                    v-model="currentFontColor"
                />
                <v-text-field
                    v-if="$props.target==='day'"
                    type="color"
                    label="土日祝"
                    :class="$style.fontColor2"
                    v-model="currentHolidayFontColor"
                />
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import type { YearlyCalendarStyleDefine } from '@/store/types';
import { inject } from 'vue';
import { defineComponent, computed } from 'vue';
import { StyleStoreKey } from '../../store/useStyle';
import FontSelect from '../common/FontSelect.vue';

export default defineComponent({
    name: 'FontSettingItemForYear',
    props: {
        label: {
            type: String,
            required: true,
        },
        target: {
            type: String as PropType<keyof YearlyCalendarStyleDefine['fonts']>,
            required: true,
        }
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);

        const fonts = computed(() => {
            if (!styleStore) return;
            return styleStore.yearlyDefine.value.fonts[props.target];
        })

        const currentFontFamily = computed({
            get() {
                return fonts.value?.fontFamily;
            },
            set(val) {
                if (!styleStore) return;
                const target = styleStore.yearlyDefine.value.fonts[props.target];
                if (!target) {
                    styleStore.yearlyDefine.value.fonts[props.target] = { fontFamily: val };
                }
                else {
                    target.fontFamily = val;
                }
            }
        });
        const currentFontSize = computed({
            get() {
                return fonts.value?.fontSize;
            },
            set(val) {
                if (!styleStore)
                    return;
                const target = styleStore.yearlyDefine.value.fonts[props.target];
                if (!target) {
                    styleStore.yearlyDefine.value.fonts[props.target] = { fontSize: val };
                }
                else {
                    target.fontSize = val;
                }
            }
        });
        const currentFontColor = computed({
            get() {
                return fonts.value?.color;
            },
            set(val) {
                if (!styleStore)
                    return;
                const target = styleStore.yearlyDefine.value.fonts[props.target];
                if (!target) {
                    styleStore.yearlyDefine.value.fonts[props.target] = { color: val };
                }
                else {
                    target.color = val;
                }
            }
        });
        const currentHolidayFontColor = computed({
            get() {
                if (props.target !== 'day')
                    return;
                return styleStore?.yearlyDefine.value.fonts[props.target]?.holidayColor;
            },
            set(val) {
                if (!styleStore)
                    return;
                if (props.target !== 'day')
                    return;
                const target = styleStore.yearlyDefine.value.fonts[props.target];
                if (!target) {
                    styleStore.yearlyDefine.value.fonts[props.target] = { holidayColor: val };
                }
                else {
                    target.holidayColor = val;
                }
            }
        });
        return {
            currentFontFamily,
            currentFontSize,
            currentFontColor,
            currentHolidayFontColor,
        };
    },
    components: { FontSelect }
});
</script>

<style lang="scss" module>
.card {
    margin: 10px 0;
}
.container {
    display: grid;

    .fontFamily {
       grid-column-start: 1;
       grid-column-end: 3;
       grid-row-start: 1;
       grid-row-end: 2;
    }

    .fontSize {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .fontColor {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .fontColor2 {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4;
    }

}
</style>
