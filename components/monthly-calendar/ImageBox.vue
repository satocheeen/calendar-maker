<template>
    <div :class="[$style.image]"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mousemove="handleMouseMove"
        v-if="hasImage"
    />
    <div :class="[$style.image, $style.noImage]" v-else>
        <p :class="$style.message">
            画像URLを指定すると、ここに画像が表示されます。
        </p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { StyleStoreKey } from '@/store/useStyle';
import { inject } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { watch } from 'vue';
import { MonthlyCalendarSettingStoreKey } from './useMonthlyCalendarSetting';

export default defineComponent({
    name: 'ImageBox',
    setup() {
        const styleStore = inject(StyleStoreKey);
        const settingStore = inject(MonthlyCalendarSettingStoreKey);

        const calendarStyleDefine = computed(() => {
            return settingStore?.styleDefine.value;
        });

        const imagePath = computed(() => {
            const path = calendarStyleDefine.value?.imagePath;
            return path ? `url(${path})` : undefined;
        });

        const hasImage = computed(() => {
            if (calendarStyleDefine.value?.imagePath === undefined) return false;
            return calendarStyleDefine.value.imagePath.length > 0;
        })

        const imageBorderColor = computed(() => {
            return calendarStyleDefine.value?.colors.imageBorderColor;
        });

        let draging = false;
        let beforePosition = {x: 0, y: 0};
        const offset = ref({x: 0, y: 0});

        watch(() => calendarStyleDefine.value?.imageOffset, (val) => {
            offset.value = val ?? { x: 0, y: 0};
        }, { immediate: true })

        const handleMouseUp = () => {
            if (draging) {
                styleStore?.setCurrentMonthlyCalendarSetting({ imageOffset: offset.value });
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
            hasImage,
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

    &.noImage {
        cursor: default;
        background-color: #eee;
        justify-content: center;
        align-items: center;
    }
}

@media print {
    .message {
        display: none;
    }
}


</style>
