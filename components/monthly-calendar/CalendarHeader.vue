<template>
    <div :class="$style.container" :style="style">
        <div :class="$style.month">
            <span :class="$style.number">{{ month }}</span>
            <span :class="$style.character">{{ monthName }}</span>
        </div>
        <div :class="$style.year">
            {{ year }}
        </div>
    </div>
</template>

<script lang="ts">
import { StyleStoreKey } from '@/store/useStyle';
import { defineComponent, computed, inject, type CSSProperties } from 'vue';

export default defineComponent({
    name: 'CalendarHeader',
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

        const monthName = computed(() => {
            const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
            const name = formatter.format(new Date(props.year, props.month - 1));
            return name;
        });

        const calendarStyleDefine = computed(() => {
            return styleStore?.currentMonthlyCalendarStyleDefine.value;
        })

        const style = computed((): CSSProperties => {
            const color = calendarStyleDefine.value?.colors.yearMonthTextColor;
            return {
                color,
            }
        });

        const fontDefine = computed(() => {
            return styleStore?.monthlyCommonDefine.value.fonts;
        })

        const monthNumFontSize = computed(() => {
            const fontSize = fontDefine.value?.monthNum?.fontSize;
            return fontSize ? fontSize + 'rem' : undefined;
        })

        const monthNumFontFamily = computed(() => {
            return fontDefine.value?.monthNum?.fontFamily;

        })

        const monthCharacterFontSize = computed(() => {
            const fontSize = fontDefine.value?.monthCharacter?.fontSize;
            return fontSize ? fontSize + 'rem' : undefined;
        })

        const monthCharacterFontFamily = computed(() => {
            return fontDefine.value?.monthCharacter?.fontFamily;
        })

        const yearFontSize = computed(() => {
            const fontSize = fontDefine.value?.year?.fontSize;
            return fontSize ? fontSize + 'rem' : undefined;
        });

        const yearFontFamily = computed(() => {
            return fontDefine.value?.year?.fontFamily;
        })

        return {
            monthName,
            style,
            monthNumFontSize,
            monthNumFontFamily,
            monthCharacterFontSize,
            monthCharacterFontFamily,
            yearFontSize,
            yearFontFamily,
        }
    }
});
</script>

<style lang="scss" module>
.container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.month {
    display: flex;
    align-items: baseline;

    .number {
        font-size: v-bind(monthNumFontSize);
        font-family: v-bind(monthNumFontFamily);
        margin-right: 1.5rem;
    }
    .character {
        font-size: v-bind(monthCharacterFontSize);
        font-family: v-bind(monthCharacterFontFamily);
    }
}
.year {
    font-size: v-bind(yearFontSize);
    font-family: v-bind(yearFontFamily);
}
</style>
