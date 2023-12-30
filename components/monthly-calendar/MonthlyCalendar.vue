<template>
    <div :class="$style.container" v-if="styleDefine">
        <template v-if="orientation==='landscape'">
            <PageLayout orientation="landscape">
                <div :class="[$style.innerPage, $style.odd]">
                    <CalendarHeader
                        :year="year" :month="month"
                        :class="$style.header" />
                    <ImageBox
                    />
                </div>
            </PageLayout>
            <PageLayout orientation="landscape">
                <div :class="[$style.innerPage, $style.even]">
                    <MonthDates :year="year" :month="month" />
                </div>
            </PageLayout>
        </template>
        <template v-else>
            <PageLayout orientation="portrait" :class="$style.portrait">
                <div :class="[$style.innerPage, $style.odd]">
                    <CalendarHeader
                        :year="year" :month="month"
                        :class="$style.header" />
                    <ImageBox/>
                </div>
                <div :class="[$style.innerPage, $style.even]">
                    <MonthDates :year="year" :month="month" />
                </div>
            </PageLayout>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarHeader from './CalendarHeader.vue';
import MonthDates from './MonthDates.vue';
import ImageBox from './ImageBox.vue';
import PageLayout from '../common/PageLayout.vue';
import { inject } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { computed } from 'vue';
import { type Orientation } from '@/store/types';
import useMonthlyCalendarSetting, { MonthlyCalendarSettingStoreKey } from './useMonthlyCalendarSetting';

export default defineComponent({
    components: { CalendarHeader, MonthDates, ImageBox, PageLayout },
    name: "MonthlyCalendar",
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
        const calendarSetting = useMonthlyCalendarSetting(props);
        provide(MonthlyCalendarSettingStoreKey, calendarSetting);

        const fontDefine = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts;
        })

        const dateNumberFontFamily = computed(() => {
            return fontDefine.value?.dateNum?.fontFamily;
        })

        const dateNumberFontSize = computed(() => {
            return fontDefine.value?.dateNum?.fontSize + 'em';
        })

        const eventFontFamily = computed(() => {
            return fontDefine.value?.eventName?.fontFamily;
        })

        const eventFontSize = computed(() => {
            return fontDefine.value?.eventName?.fontSize + 'em';
        })

        const eventColor = computed(() => {
            return calendarSetting.styleDefine.value?.colors.eventNameTextColor;
        })

        const orientation = computed<Orientation>(() => {
            return styleStore?.monthlyCommonDefine.value.orientation ?? 'portrait';
        })

        const styleDefine = computed(() => {
            return styleStore?.getMonthlyCalendarStyleDefine(props.year, props.month);
        })

        return {
            orientation,
            styleDefine,
            dateNumberFontFamily,
            dateNumberFontSize,
            eventFontFamily,
            eventFontSize,
            eventColor,
        }
    }
});
</script>

<style lang="scss" module>
.container {
    --day-font-family: v-bind(dateNumberFontFamily);
    --day-font-size: v-bind(dateNumberFontSize);
    --event-font-family: v-bind(eventFontFamily);
    --event-font-size: v-bind(eventFontSize);
    --event-color: v-bind(eventColor);
}
.page {
    width: 100%;
    aspect-ratio: 178 / 124;
    border: 1px solid #eee;

    break-after: always;
    &:last-child {
        page-break-after: auto;
    }
}
.innerPage {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5rem;

    // 奇数ページ
    &.odd {
        padding-top: 2rem;
        padding-bottom: 4rem;
    }
    &.even {
        padding-top: 4rem;
        padding-bottom: 1rem;
    }
}
.portrait {
    .innerPage {
        height: 50%;
    }
}

.header {
}

@media print {
    .page {
        border: none;
    }
}

</style>
