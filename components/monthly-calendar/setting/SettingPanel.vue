<template>
    <PrintOutBtn />
    <v-tabs v-model="currentTab" align-tabs="center">
        <v-tab value="month">月ごとの設定</v-tab>
        <v-tab value="year">年間表示</v-tab>
    </v-tabs>
    <v-window v-model="currentTab">
        <v-window-item value="month">
            <v-container fluid>
                <div :class="$style.yearMonthArea">
                    <YearSelect />
                    <MonthSelect />
                </div>
                <h3 :class="$style.subheader">全体設定</h3>
                <OrientationSelect />
                <FontSettingPanel />

                <v-divider :class="$style.divider" />
                <h3 :class="$style.subheader">月ごとの設定</h3>
                <v-text-field label="画像URL" v-model="imagePath" />
                <ColorSettingPanel :year-month="yearMonth" />

                <v-divider :class="$style.divider" />

            </v-container>
        </v-window-item>
        <v-window-item value="year">
            <v-container fluid>
                <div :class="$style.yearMonthArea">
                    <YearSelect />
                </div>
                <h3 :class="$style.subheader">全体設定</h3>
                <OrientationSelect />
                <FontSettingPanel />
            </v-container>
        </v-window-item>

    </v-window>
</template>

<script lang="ts">
import { StyleStoreKey } from '@/store/useStyle';
import { defineComponent, inject, computed } from 'vue';
import ColorSettingPanel from './ColorSettingPanel.vue';
import FontSettingPanel from './FontSettingPanel.vue';
import YearSelect from '@/components/common/YearSelect.vue';
import MonthSelect from '@/components/common/MonthSelect.vue';
import PrintOutBtn from '@/components/common/PrintOutBtn.vue';
import OrientationSelect from './OrientationSelect.vue';
import { OperationStoreKey, type YearMonth } from '~/store/useOperation';

export type TabKind = 'month' | 'year';
export default defineComponent({
    name: "SettingPanel",
    components: { ColorSettingPanel, FontSettingPanel, YearSelect, MonthSelect, PrintOutBtn, OrientationSelect },
    props: {
        tab: {
            type: String as PropType<TabKind>,
            required: true,
        },
    },
    emits: {
        // eslint-disable-next-line
        'update:tab': (val: TabKind) => true,
    },
    setup(props, { emit }) {
        const operationStore = inject(OperationStoreKey);
        const styleStore = inject(StyleStoreKey);
        const currentTab = computed<TabKind>({
            get() {
                return props.tab;
            },
            set(val) {
                emit('update:tab', val);
            }
        })

        const yearMonth = computed<YearMonth>(() => {
            return operationStore?.yearMonth.value ??
                        { year: new Date().getFullYear(), month: 1 };
        })

        const calendarStyleDefine = computed(() => {
            return styleStore?.getCalendarStyleDefine(yearMonth.value.year, yearMonth.value.month);
        });
        const imagePath = computed({
            get() {
                return calendarStyleDefine.value?.imagePath;
            },
            set(val) {
                if (!styleStore) return;
                const year = yearMonth.value.year;
                const month = yearMonth.value.month;
                styleStore.setMonthlyCalendarSetting(year, month,  { imagePath: val});
            }
        });


        return {
            currentTab,
            imagePath,
            yearMonth,
        };
    },
});
</script>

<style lang="scss" module>
.subheader {
    font-size: 1em;
    font-weight: 600;
    margin: 1em 0;
}
.divider {
    width: 50%;
    margin: 1em auto;
}

.yearMonthArea {
    display: flex;
    flex-direction: row;
    gap: 10px;
    > * {
        flex: 1;
    }
}
</style>
