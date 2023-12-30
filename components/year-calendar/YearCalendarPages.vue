<template>
    <PageLayout orientation="portrait">
        <div :class="$style.thisYearPage">
            <YearCalendar :year="$props.year" />
        </div>
    </PageLayout>
    <PageLayout orientation="portrait">
        <div :class="$style.lastNextYearPage">
            <div>
                <YearCalendar :year="$props.year-1" minimum />
            </div>
            <hr :class="$style.divider" />
            <div>
                <YearCalendar :year="$props.year+1" minimum />
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts">
import { inject, computed, defineComponent } from 'vue';
import PageLayout from '../common/PageLayout.vue';
import YearCalendar from './YearCalendar.vue';
import { StyleStoreKey } from '@/store/useStyle';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'YearCalendarPages',
    components: { PageLayout, YearCalendar },
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    setup() {
        const styleStore = inject(StyleStoreKey);
        const operationStore = inject(OperationStoreKey);

        const dividerWidth = computed(() => {
            return operationStore?.fontSizePx(styleStore?.yearlyDefine.value.divider?.width);
        })

        const dividerSize = computed(() => {
            return styleStore?.yearlyDefine.value.divider?.size + '%';
        })

        const dividerColor = computed(() => {
            return styleStore?.yearlyDefine.value.divider?.color;
        })

        const dividerStyle = computed(() => {
            return styleStore?.yearlyDefine.value.divider?.style ?? 'solid';
        })

        return {
            dividerWidth,
            dividerSize,
            dividerColor,
            dividerStyle,
        }
    }
});
</script>

<style lang="scss" module>
.thisYearPage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.lastNextYearPage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;
}
.divider {
    width: v-bind(dividerSize);
    border-width: 0;
    border-top-width: v-bind(dividerWidth);
    border-color: v-bind(dividerColor);
    border-style: v-bind(dividerStyle);
    margin: 1.2rem;
}
</style>
