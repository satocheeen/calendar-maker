<template>
    <div :class="$style.preset">
        <span v-for="(color, index) in colorList" :key="index"
            :class="$style.col" :style="{backgroundColor: color}" />
    </div>
</template>

<script lang="ts">
import { type MonthlyColorDefine } from '@/store/types';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'PresetBar',
    props: {
        preset : {
            type: Object as PropType<MonthlyColorDefine>,
            required: true,
        }
    },
    setup(props) {
        const colorList = computed(() => {
            return [
                props.preset.imageBorderColor,
                props.preset.weekdayTextColor,
                props.preset.weekdayBackgroundColor,
                props.preset.holidayTextColor,
                props.preset.holidayBackgroundColor,
                props.preset.anotherMonthsDayTextColor,
                props.preset.eventNameTextColor,
                props.preset.yearMonthTextColor,
                props.preset.weekdayLabelTextColor,
                props.preset.weekdayLabelBackgroundColor,
                props.preset.borderColor,
            ]
        });

        return {
            colorList,
        }
    }
});
</script>

<style lang="scss" module>
.preset {
    border: 1px solid #aaa;
    height: 20px;
    margin-right: 5px;
    display: flex;
}
.col {
    width: 5px;
    height: 100%;
}
</style>
