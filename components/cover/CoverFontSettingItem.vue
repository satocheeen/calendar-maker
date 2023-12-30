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
                <div :class="$style.fontSize">
                    <v-slider
                        label="Size"
                        thumb-label="always"
                        min="0.5"
                        max="5"
                        step=".1"
                        v-model="currentFontSize"
                    />
                </div>
                <div :class="$style.fontColor">
                    <v-text-field
                        type="color"
                        v-model="currentFontColor"
                    />
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { inject } from 'vue';
import { defineComponent, computed } from 'vue';
import { StyleStoreKey } from '../../store/useStyle';
import FontSelect from '../common/FontSelect.vue';

export default defineComponent({
    name: 'CoverFontSettingItem',
    props: {
        label: {
            type: String,
            required: true,
        },
    },
    setup() {
        const styleStore = inject(StyleStoreKey);

        const fonts = computed(() => {
            if (!styleStore) return;
            return styleStore.yearlyDefine.value.cover.font;
        })

        const currentFontFamily = computed({
            get() {
                return fonts.value?.fontFamily;
            },
            set(val) {
                if (!styleStore) return;
                styleStore.updateYearlyDefine({
                    cover: {
                        font: {
                            fontFamily: val,
                        }
                    },
                })
            }
        });

        const currentFontSize = computed({
            get() {
                return fonts.value?.fontSize;
            },
            set(val) {
                if (!styleStore)
                    return;
                styleStore.updateYearlyDefine({
                    cover: {
                        font: {
                            fontSize: val,
                        }
                    },
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
                    cover: {
                        font: {
                            color: val,
                        }
                    },
                })
            }
        });

        return {
            currentFontFamily,
            currentFontSize,
            currentFontColor,
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

    .fontSize {
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
