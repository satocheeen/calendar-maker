<template>
    <v-card>
        <v-card-title primary-title>
            色設定
        </v-card-title>
        <v-card-actions>
            <ClientOnly>
                <v-tooltip :text="savePresetTooltip"
                    @update:model-value="resetPresetSavedFlag"
                    location="start"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn flat color="primary" v-bind="props" @click="onSaveToPreset">プリセット保存</v-btn>
                    </template>
                </v-tooltip>

                <v-menu
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <v-tooltip text="保存済みのカラーセットを読み込みます">
                            <template v-slot:activator="{ props: props2 }">
                                <v-btn flat color="primary" v-bind="{...props, ...props2}"
                                >
                                    プリセット読込
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template>
                    <PresetSelector
                        @select="setPreset" @delete="removePreset" /> 

                </v-menu>
            </ClientOnly>
        </v-card-actions>
        <v-card-actions>
            <ClientOnly>
                <v-btn flat color="primary" @click="toDefaultColors" :disabled="isDefaultColors">
                    デフォルト色に戻す
                </v-btn>
            </ClientOnly>
        </v-card-actions>
        <v-card-text>
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="画像罫線"
                :colors="[{
                    defineKey: 'imageBorderColor'
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="年月"
                :colors="[{
                    defineKey: 'yearMonthTextColor',
                    label: '文字'
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="平日"
                :colors="[{
                    defineKey: 'weekdayTextColor',
                    label: '文字',
                }, {
                    defineKey: 'weekdayBackgroundColor',
                    label: '背景',
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="土日祝"
                :colors="[{
                    defineKey: 'holidayTextColor',
                    label: '文字',
                }, {
                    defineKey: 'holidayBackgroundColor',
                    label: '背景',
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="前月・翌月"
                :colors="[{
                    defineKey: 'anotherMonthsDayTextColor',
                    label: '文字',
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="祝日・イベント名"
                :colors="[{
                    defineKey: 'eventNameTextColor',
                    label: '文字',
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="曜日ラベル"
                :colors="[{
                    defineKey: 'weekdayLabelTextColor',
                    label: '文字',
                }, {
                    defineKey: 'weekdayLabelBackgroundColor',
                    label: '背景',
                }]"
            />
            <ColorSettingItem
                :year-month="$props.yearMonth"
                label="罫線"
                :colors="[{
                    defineKey: 'borderColor',
                }]"
            />
        </v-card-text>
    </v-card>    
</template>

<script lang="ts">
import { type MonthlyColorDefine } from '@/store/types';
import { StyleStoreKey } from '@/store/useStyle';
import { onMounted, onUnmounted } from 'vue';
import { ref, defineComponent, inject } from 'vue';
import PresetSelector from './PresetSelector.vue';
import ColorSettingItem from './ColorSettingItem.vue';
import { type YearMonth } from '~/store/useOperation';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'ColorSettingPanel',
    components: { PresetSelector, ColorSettingItem },
    props: {
        yearMonth: {
            type: Object as PropType<YearMonth>,
            required: true,
        }
    },
    setup(props) {
        const isShowPresetSelector = ref(false);

        const onAreaClick = () => {
            if (isShowPresetSelector.value) {
                isShowPresetSelector.value = false;
            }
        }

        onMounted(() => {
            document.addEventListener('click', onAreaClick)
        })

        onUnmounted(() => {
            document.removeEventListener('click', onAreaClick);
        })

        const styleStore = inject(StyleStoreKey);

        const savedFlag = ref(false);
        const savePresetTooltip = computed(() => {
            if (savedFlag.value) {
                return '保存しました';
            }
            return '保存すると他の年月でもカラーセットを使用できるようになります';
        })

        const resetPresetSavedFlag = () => {
            // すぐにフラグを変更すると、Tooltipが非表示になる前にメッセージが変わってしまうので、若干時間をおく
            setTimeout(() => {
                savedFlag.value = false;
            }, 500)
        }

        const onSaveToPreset = () => {
            if (!styleStore) return;
            const yearMonth = props.yearMonth;
            const currentColors = styleStore.getCalendarStyleDefine(yearMonth.year, yearMonth.month).colors;
            styleStore.addPreset(currentColors);
            savedFlag.value = true;
        };
        const switchShowPresetSelector = () => {
            isShowPresetSelector.value = !isShowPresetSelector.value;
        };

        /**
         * 現在表示中のカレンダーに指定のプリセットカラーを設定する
         * @param preset 
         */
        const setPreset = (preset: MonthlyColorDefine) => {
            if (!styleStore) return;
            styleStore.setPreset(props.yearMonth.year, props.yearMonth.month, preset);
            isShowPresetSelector.value = false;
        }

        const removePreset = (index: number) => {
            styleStore?.removePreset(index);
        }

        /**
         * デフォルト色に戻す
         */
        const toDefaultColors = () => {
            if (!styleStore) return;

            const yearMonth = props.yearMonth;
            styleStore.resetMonthlyCalendarColor(yearMonth.year, yearMonth.month);
        }

        const isDefaultColors = computed(() => {
            if (!styleStore) return true;
            const yearMonth = props.yearMonth;
            return styleStore.isDefaultColor(yearMonth.year, yearMonth.month);
        })

        return {
            onSaveToPreset,
            isShowPresetSelector,
            switchShowPresetSelector,
            setPreset,
            removePreset,
            onAreaClick,
            savePresetTooltip,
            resetPresetSavedFlag,
            toDefaultColors,
            isDefaultColors,
        };
    }
});
</script>

<style lang="scss" module></style>
