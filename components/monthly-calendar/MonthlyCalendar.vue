<template>
    <div :class="$style.container">
        <template v-if="orientation==='landscape'">
            <PageLayout orientation="landscape">
                <div :class="[$style.innerPage, $style.odd]">
                    <CalendarHeader :year="year" :month="month" :class="$style.header" />
                    <ImageBox :year="year" :month="month" />
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
                    <CalendarHeader :year="year" :month="month" :class="$style.header" />
                    <ImageBox :year="year" :month="month" />
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
    setup() {
        const store = inject(StyleStoreKey);

        const orientation = computed<Orientation>(() => {
            return store?.monthlyCommonDefine.value.orientation ?? 'portrait';
        })

        return {
            orientation,
        }
    }
});
</script>

<style lang="scss" module>
.container {
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
