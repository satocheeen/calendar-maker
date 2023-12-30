<template>
    <PageLayout orientation="portrait">
        <div :class="$style.thisYearPage">
            <div>
                <YearCalendar :year="$props.year" />
            </div>
        </div>
    </PageLayout>
    <PageLayout orientation="portrait">
        <div :class="$style.lastNextYearPage">
            <div>
                <YearCalendar :year="$props.year-1" minimum />
            </div>
            <div>
                <hr :class="$style.divider" />
            </div>
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
    padding: 20% 10%;
    width: 100%;
    height: 100%;
    margin: auto;

    > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.lastNextYearPage {
    padding: 5% 10%;
    width: 100%;
    height: 100%;
    margin: auto;

    display: grid;
    grid-template-rows: 1fr calc(2px * var(--font-base)) 1fr;

    > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        // border: 1px solid blue;

    }    
}
.divider {
    width: v-bind(dividerSize);
    border-width: 0;
    border-top-width: v-bind(dividerWidth);
    border-color: v-bind(dividerColor);
    border-style: v-bind(dividerStyle);
}
</style>
