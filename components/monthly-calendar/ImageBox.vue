<template>
    <div :class="$style.image"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mousemove="handleMouseMove"
    />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { inject } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { watch } from 'vue';

export default defineComponent({
    name: 'ImageBox',
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

        const calendarStyleDefine = computed(() => {
            return styleStore?.getCalendarStyleDefine(props.year, props.month);
        });

        const imagePath = computed(() => {
            const path = calendarStyleDefine.value?.imagePath;
            return path ? `url(${path})` : undefined;
        });

        const imageBorderColor = computed(() => {
            return styleStore?.getCalendarStyleDefine(props.year, props.month).colors.imageBorderColor;
        });

        let draging = false;
        let beforePosition = {x: 0, y: 0};
        const offset = ref({x: 0, y: 0});

        watch(() => calendarStyleDefine.value?.imageOffset, (val) => {
            offset.value = val ?? { x: 0, y: 0};
        }, { immediate: true })

        const handleMouseUp = () => {
            if (draging) {
                styleStore?.setMonthlyCalendarSetting(props.year, props.month, { imageOffset: offset.value });
            }
            draging = false;
        }

        onMounted(() => {
            document.addEventListener('mouseup', handleMouseUp);
        })

        onUnmounted(() => {
            document.removeEventListener('mouseup', handleMouseUp);
        })

        const handleMouseDown = (evt: MouseEvent) => {
            beforePosition = {
                x: evt.pageX,
                y: evt.pageY,
            }
            draging = true;
        }

        const handleMouseMove = (evt: MouseEvent) => {
            if (!draging) return;

            let newX = offset.value.x + (evt.pageX - beforePosition.x);
            if (newX > 0) newX = 0;
            if (newX < -100) newX = -100;
            offset.value.x = newX;

            let newY = offset.value.y + (evt.pageY - beforePosition.y);
            if (newY > 0) newY = 0;
            if (newY < -100) newY = -100;
            offset.value.y = newY;

            beforePosition = {
                x: evt.pageX,
                y: evt.pageY,
            }

        }

        const offsetX = computed(() => {
            return -offset.value.x + '%';
        })

        const offsetY = computed(() => {
            return -offset.value.y + '%';
        })

        return {
            imagePath,
            imageBorderColor,
            handleMouseDown,
            handleMouseUp,
            handleMouseMove,
            offsetX,
            offsetY,
        }

    },
});
</script>

<style lang="scss" module>
.image {
    width: 100%;
    display: flex;
    flex: 1;
    border: 1px solid;
    border-color: v-bind(imageBorderColor);

    background-image: v-bind(imagePath);
    background-position-x: v-bind(offsetX);
    background-position-y: v-bind(offsetY);
    background-size: cover;

    cursor: pointer;
}


</style>
