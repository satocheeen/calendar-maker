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
        }
    },
    setup() {
        const styleStore = inject(StyleStoreKey);

        const fontDefine = computed(() => {
            return styleStore?.yearlyDefine.value.fonts;
        })

        const yearFontFamily = computed(() => {
            return  fontDefine.value?.year?.fontFamily;
        })

        const yearFontSize = computed(() => {
            const size = fontDefine.value?.year?.fontSize ?? 1;
            return size + 'rem';
        })

        const yearColor = computed(() => {
            return  fontDefine.value?.year?.color;
        })

        const dayFontSize = computed(() => {
            const size = fontDefine.value?.day?.fontSize ?? 1;
            return size + 'rem';
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
        font-size: calc(v-bind(dayFontSize) * 1.2);
    }
    .calendarArea {
        gap: .5rem 3rem;
    }
}
</style>
