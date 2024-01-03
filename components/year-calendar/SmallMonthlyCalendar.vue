<template>
    <div :class="[$style.container, $props.minimum ? $style.minimum : '']">
        <div :class="$style.month">{{ $props.month }}月</div>
        <ul :class="$style.dateArea">
            <li v-for="(d, index) in days" :key="index" :class="[$style.day, d.isHoliday ? $style.holiday : '']">
                {{ d.day }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { OperationStoreKey } from '~/store/useOperation';
import useMonthlyCalendarSetting from '../monthly-calendar/useMonthlyCalendarSetting';

export default defineComponent({
    name: 'SmallMonthlyCalendar',
    props: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        minimum: {
            type: Boolean,
        }
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);
        const calendarSetting = useMonthlyCalendarSetting(props);
        const dates = computed(() => calendarSetting.dates.value);

        const days = computed(() => {
            return dates.value.map(d => {
                return {
                    day: d.anotherMonth ? undefined : d.day.getDate(),
                    isHoliday: d.isHoliday,
                }
            })
        })

        const fontDefine = computed(() => {
            return styleStore?.yearlyDefine.value.fonts;
        })

        const monthFontFamily = computed(() => {
            return  fontDefine.value?.month.fontFamily;
        })

        const operationStore = inject(OperationStoreKey);
        const monthFontSize = computed(() => {
            const month = fontDefine.value?.month;
            if (!month) return '1rem';
            const size = !props.minimum ? month.thisYearFontSize : month.lastNextYearsFontSize;
            return operationStore?.fontSizePx(size);
        })

        const monthColor = computed(() => {
            return  fontDefine.value?.month?.color;
        })

        const dayFontFamily = computed(() => {
            return  fontDefine.value?.day?.fontFamily;
        })

        const dayFontSize = computed(() => {
            const day = fontDefine.value?.day;
            if (!day) return '1rem';
            const size = !props.minimum ? day.thisYearFontSize : day.lastNextYearsFontSize;
            return operationStore?.fontSizePx(size);
        })

        const dayColor = computed(() => {
            return fontDefine.value?.day?.color;
        })

        const holidayColor = computed(() => {
            return fontDefine.value?.day?.holidayColor;
        })

        return {
            days,
            monthFontFamily,
            monthFontSize,
            monthColor,
            dayFontFamily,
            dayFontSize,
            dayColor,
            holidayColor,
        }
    }
});
</script>

<style lang="scss" module>
.container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: calc(v-bind(monthFontSize) + 0.5px * var(--font-base)) 1fr;

    // >* {
    //     border: 1px solid red;
    // }
}
.month {
    // margin-bottom: calc(.5px * var(--font-base));
    font-family: v-bind(monthFontFamily);
    font-size: v-bind(monthFontSize);
    color: v-bind(monthColor);
    text-align: center;
}
.dateArea {
    list-style: none;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    // >* {
    //     border: 1px solid red;
    // }

}
.day {
    display: inline-block;
    font-family: v-bind(dayFontFamily);
    font-size: v-bind(dayFontSize);
    color: v-bind(dayColor);
    text-align: right;
    overflow: hidden;

    &.holiday {
        color: v-bind(holidayColor);
    }
}
.minimum {
    // .month {
    //     margin-bottom: calc(.2px * var(--font-base));
    // }

    // .dateArea {
    //     gap: calc(.1px * var(--font-base)) calc(.5px * var(--font-base));
    // }
}

</style>
