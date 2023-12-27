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
import useDate from '@/util/useDate';

const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

/**
 * 指定の年月の日付を表示する
 */
export default defineComponent({
    components: { DateBox },
    name: 'MonthDates',
    props: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);
        const dates = useDate(props);

        const weekdayLabelColor = computed(() => {
            return styleStore?.getCalendarStyleDefine(props.year, props.month).colors.weekdayLabelTextColor;
        });

        const weekdayLabelFontFamily = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts.weekdayLabel?.fontFamily;
        })

        const weekdayLabelFontSize = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts.weekdayLabel?.fontSize + 'rem';
        })

        const weekdayLabelBackgroundColor = computed(() => {
            return styleStore?.getCalendarStyleDefine(props.year, props.month).colors.weekdayLabelBackgroundColor;

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
