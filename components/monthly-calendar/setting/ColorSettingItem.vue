<template>
    <div :class="$style.row">
        <label>{{ $props.label }}</label>
        <div :class="$style.value">
            <label v-for="(color, index) in myColors" :key="index">
                {{ color.label }}
                <input type="color" :class="$style.colorInput" :value="color.color" @input="handleChangeColor(index, $event)" />
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { type MonthlyColorDefine } from '@/store/types';
import { StyleStoreKey } from '@/store/useStyle';
import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import type { YearMonth } from '~/store/useOperation';
import { MonthlyCalendarSettingStoreKey } from '../useMonthlyCalendarSetting';

type ColorItem = {
    defineKey: keyof MonthlyColorDefine;
    label?: string;
}
export default defineComponent({
    name: 'ColorSettingItem',
    props: {
        label: {
            type: String,
            required: true,
        },
        colors: {
            type: Array as PropType<ColorItem[]>,
            required: true,
        },
    },
    setup(props) {
        const styleStore = inject(StyleStoreKey);
        const settingStore = inject(MonthlyCalendarSettingStoreKey);

        const calendarStyleDefine = computed(() => {
            return settingStore?.styleDefine.value;
        });

        const myColors = computed(() => {
            return props.colors.map(colorDef => {
                const color = function() {
                    if (!calendarStyleDefine.value) return '#ffffff';
                    return calendarStyleDefine.value.colors[colorDef.defineKey] ?? "#ffffff";
                }();
                return Object.assign(colorDef, { color });
            })
        })

        const handleChangeColor = (index: number, event: Event) => {
            const target = event.target as HTMLInputElement;
            const key = props.colors[index].defineKey;
            styleStore?.setCurrentMonthlyCalendarColor(key, target.value);
        }

        return {
            myColors,
            handleChangeColor,
        }
    },
});
</script>

<style lang="scss" module>
.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;

    .value {
        display: flex;
        flex-direction: row;
        gap: 0.2rem;

        label {
            display: inline-flex;
            align-items: center;
            font-size: 1em;
        }
    }
}
.colorInput {
    border: none;
    padding: 0;
    cursor: pointer;
}

</style>
