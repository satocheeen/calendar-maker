<template>
    <div :class="$props.minimum ? $style.minimum : ''">
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
import useDate from '@/util/useDate';
import { StyleStoreKey } from '@/store/useStyle';

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
        const dates = useDate(props);

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

        const monthFontSize = computed(() => {
            const month = fontDefine.value?.month;
            if (!month) return '1rem';
            const size = !props.minimum ? month.thisYearFontSize : month.lastNextYearsFontSize;
            return size + 'rem';
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
            return size + 'rem';
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
.month {
    margin-bottom: .5rem;
    font-family: v-bind(monthFontFamily);
    font-size: v-bind(monthFontSize);
    color: v-bind(monthColor);
    text-align: center;
}
.dateArea {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: .5rem;
}
.day {
    font-family: v-bind(dayFontFamily);
    font-size: v-bind(dayFontSize);
    color: v-bind(dayColor);
    text-align: right;

    &.holiday {
        color: v-bind(holidayColor);
    }
}
.minimum {
    .month {
        margin-bottom: .2rem;
    }

    .dateArea {
        gap: .1rem .5rem;
    }
}

</style>
