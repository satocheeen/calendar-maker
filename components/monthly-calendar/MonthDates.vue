<template>
    <div :class="$style.Container">
        <div :class="$style.LabelArea">
            <ul>
                <li v-for="(w, index) in weekDays" :key="index" :class="$style.weekday">
                    <span>{{ w }}</span>
                </li>
            </ul>
        </div>
        <div :class="$style.DateBoxArea">
            <ul>
                <li v-for="(d, index) in dates" :key="index">
                    <date-box
                        :day="d"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent } from 'vue';
import DateBox from './DateBox.vue';
import { StyleStoreKey } from '@/store/useStyle';
import { MonthlyCalendarSettingStoreKey } from './useMonthlyCalendarSetting';
import { OperationStoreKey } from '~/store/useOperation';

const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

/**
 * 指定の年月の日付を表示する
 */
export default defineComponent({
    components: { DateBox },
    name: 'MonthDates',
    setup() {
        const styleStore = inject(StyleStoreKey);
        const settingStore = inject(MonthlyCalendarSettingStoreKey);
        const dates = computed(() => settingStore?.dates.value);

        const styleDefine = computed(() => {
            return settingStore?.styleDefine.value;
        })
        const weekdayLabelColor = computed(() => {
            return styleDefine.value?.colors.weekdayLabelTextColor;
        });

        const weekdayLabelFontFamily = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts.weekdayLabel?.fontFamily;
        })

        const operationStore = inject(OperationStoreKey);
        const weekdayLabelFontSize = computed(() => {
            return operationStore?.fontSizePx(styleStore?.monthlyCommonDefine.value.fonts.weekdayLabel?.fontSize);
        })

        const weekdayLabelBackgroundColor = computed(() => {
            return styleDefine.value?.colors.weekdayLabelBackgroundColor;

        })

        return {
            dates,
            weekDays,
            weekdayLabelColor,
            weekdayLabelFontFamily,
            weekdayLabelFontSize,
            weekdayLabelBackgroundColor,
        }
    }
});
</script>

<style lang="scss" module>
.Container {
    height: 100%;
    display: flex;
    flex-direction: column;

    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;

        li {
            width: 14%;
        }
    }
}
.LabelArea {
    li {
        display: inline-flex;
        align-items: center;
        justify-content: center;        
    }
}
.DateBoxArea {
    height: 100%;

    ul {
        height: 100%;

        li {
            height: calc(100% / 6);
        }
    }
}
.weekday {
    font-weight: bold;
    font-family: v-bind(weekdayLabelFontFamily);
    font-size: v-bind(weekdayLabelFontSize);
    color: v-bind(weekdayLabelColor);
    background-color: v-bind(weekdayLabelBackgroundColor);
}
</style>
