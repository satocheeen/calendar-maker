font<template>
    <v-card :class="$style.card">
        <v-card-title>{{ $props.label }}</v-card-title>
        <v-card-text>
            <div :class="$style.container">
                <div :class="$style.fontFamily">
                    <font-select
                        label="フォント"
                        v-model="currentFontFamily"
                    />
                </div>
                <div :class="$style.thisYearFontSize">
                    <v-slider
                        label="Size(今年)"
                        thumb-label="always"
                        min="0.5"
                        max="5"
                        step=".1"
                        v-model="currentThisYearFontSize"
                    />
                </div>
                <div :class="$style.lastNextYearsFontSize">
                    <v-slider
                        label="Size(前次年)"
                        thumb-label="always"
                        min="0.1"
                        max="1"
                        step=".1"
                        v-model="currentLastNextYearsFontSize"
                    />
                </div>
                <div :class="$style.fontColor">
                    <v-text-field
                        type="color"
                        :label="$props.target==='day' ? '平日' : ''"
                        v-model="currentFontColor"
                    />
                </div>
                <div :class="$style.fontColor2">
                    <v-text-field
                        v-if="$props.target==='day'"
                        type="color"
                        label="土日祝"
                        v-model="currentHolidayFontColor"
                    />
                </div>
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
                styleStore.updateYearlyDefine({
                    fonts: {
                        [props.target]: {
                            fontFamily: val,
                        },
                    }
                })
            }
        });
        const currentThisYearFontSize = computed({
            get() {
                return fonts.value?.thisYearFontSize;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateYearlyDefine({
                    fonts: {
                        [props.target]: {
                            thisYearFontSize: val,
                        },
                    }
                })
            }
        });
        const currentLastNextYearsFontSize = computed({
            get() {
                return fonts.value?.lastNextYearsFontSize;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateYearlyDefine({
                    fonts: {
                        [props.target]: {
                            lastNextYearsFontSize: val,
                        },
                    }
                })
            }
        });

        const currentFontColor = computed({
            get() {
                return fonts.value?.color;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateYearlyDefine({
                    fonts: {
                        [props.target]: {
                            color: val,
                        },
                    }
                })
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

                styleStore.updateYearlyDefine({
                    fonts: {
                        [props.target]: {
                            holidayColor: val,
                        },
                    }
                })
            }
        });
        return {
            currentFontFamily,
            currentThisYearFontSize,
            currentLastNextYearsFontSize,
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
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;

    > * {
        display: flex;
    }

    .fontFamily {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
    }

    .thisYearFontSize {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    .lastNextYearsFontSize {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }


    .fontColor {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }

    .fontColor2 {
        grid-column: 2 / 3;
        grid-row-start: 3;
        grid-row-end: 4;
    }

}
</style>
