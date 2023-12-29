<template>
    <div :class="$style.Box">
        <div :class="$style.InnerBox" :style="innerBoxStyle">
            <div :class="$style.NumBox" :style="numberStyle">
                {{dayNum}}
            </div>
            <div :class="$style.EventName">
                {{eventName}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, type CSSProperties } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { type DayInfo } from '@/util/useDate';

export default defineComponent({
    name: 'DateBox',
    props: {
        day: {
            type: Object as PropType<DayInfo>,
                required: true,
        }
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);

        const dayNum = computed(() => {
            return props.day.day.getDate();
        });

        const eventName = computed(() => {
            if (props.day.anotherMonth) return '';
            return props.day.event?.eventName ?? '';
        });

        const calendarStyleDefine = computed(() => {
            return styleStore?.currentMonthlyCalendarStyleDefine.value.colors;
        })

        const numberStyle = computed((): CSSProperties => {
            let color: string | undefined;
            if (props.day.anotherMonth) {
                color = calendarStyleDefine.value?.anotherMonthsDayTextColor;
            } else if (props.day.isHoliday) {
                color = calendarStyleDefine.value?.holidayTextColor;
            } else {
                color = calendarStyleDefine.value?.weekdayTextColor;
            }

            let backgroundColor: string | undefined;
            if (props.day.anotherMonth) {
                backgroundColor = undefined;
            } else if (props.day.isHoliday) {
                backgroundColor = calendarStyleDefine.value?.holidayBackgroundColor;
            } else {
                backgroundColor = calendarStyleDefine.value?.weekdayBackgroundColor;
            }

            return {
                color,
                backgroundColor,
            }
        });

        const fontDefine = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts;
        })

        const dateNumberFontFamily = computed(() => {
            return fontDefine.value?.dateNum?.fontFamily;
        })

        const dateNumberFontSize = computed(() => {
            return fontDefine.value?.dateNum?.fontSize + 'rem';
        })

        const eventColor = computed(() => {
            return calendarStyleDefine.value?.eventNameTextColor;
        })

        const eventFontFamily = computed(() => {
            return fontDefine.value?.eventName?.fontFamily;
        })

        const eventFontSize = computed(() => {
            return fontDefine.value?.eventName?.fontSize + 'rem';
        })

        const innerBoxStyle = computed((): CSSProperties => {
            const borderColor = calendarStyleDefine.value?.borderColor;

            return {
                borderColor,
            }
        });

        return {
            dayNum,
            // isHoliday,
            eventName,
            numberStyle,
            eventColor,
            eventFontFamily,
            eventFontSize,
            innerBoxStyle,
            dateNumberFontFamily,
            dateNumberFontSize,
        }
    },
});
</script>

<style lang="scss" module>
.Box {
    height: 100%;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
}
.InnerBox {
    width: 100%;
    height: 100%;
    border-top: 1px solid;
    border-right: 1px solid;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.NumBox {
    width: 2rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: v-bind(dateNumberFontFamily);
    font-size: v-bind(dateNumberFontSize);
}
.EventName {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    color: v-bind(eventColor);
    // transform: scale(.7) translateX(15%);
    word-break: keep-all;
    font-size: v-bind(eventFontSize);
    font-family: v-bind(eventFontFamily);
    margin-right: .2rem;
}
</style>
