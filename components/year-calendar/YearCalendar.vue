<template>
    <div :class="[$style.container, $props.minimum ? $style.minimum : '']">
        <div :class="$style.year">{{ $props.year }}</div>
        <div :class="$style.calendarArea">
            <div v-for="n in 12" :key="n">
                <SmallMonthlyCalendar :year="$props.year" :month="n" :minimum="$props.minimum" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SmallMonthlyCalendar from './SmallMonthlyCalendar.vue';
import { StyleStoreKey } from '@/store/useStyle';
import { inject } from 'vue';
import { computed } from 'vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'YearCalendar',
    components: { SmallMonthlyCalendar },
    props: {
        year: {
            type: Number,
            required: true,
        },
        minimum: {
            type: Boolean,
        },
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);

        const fontDefine = computed(() => {
            return styleStore?.yearlyDefine.value.fonts;
        })

        const yearFontFamily = computed(() => {
            return  fontDefine.value?.year?.fontFamily;
        })

        const operationStore = inject(OperationStoreKey);
        const yearFontSize = computed(() => {
            const year = fontDefine.value?.year;
            if (!year) return '1rem';
            const size = !props.minimum ? year.thisYearFontSize : year.lastNextYearsFontSize;
            return operationStore?.fontSizePx(size);
        })

        const yearColor = computed(() => {
            return  fontDefine.value?.year?.color;
        })

        const dayFontSize = computed(() => {
            const day = fontDefine.value?.day;
            if (!day) return '1rem';
            const size = !props.minimum ? day.thisYearFontSize : day.lastNextYearsFontSize;
            return operationStore?.fontSizePx(size);
        })

        return {
            yearFontFamily,
            yearFontSize,
            yearColor,
            dayFontSize,
        }
    }
});
</script>

<style lang="scss" module>

.container {
}

.calendarArea {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
}
.year {
    font-family: v-bind(yearFontFamily);
    font-size: v-bind(yearFontSize);
    color: v-bind(yearColor);
    margin-bottom: 2rem;
    text-align: center;
}
.minimum {
    .year {
        margin-bottom: .5rem;
    }
    .calendarArea {
        gap: .5rem 3rem;
    }
}
</style>
