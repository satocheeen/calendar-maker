<template>
    <div :class="[$style.page, 'calendar-page']" ref="pageRef">
        <slot />
    </div>
</template>

<script lang="ts">
import { type Orientation } from '@/store/types';
import { defineComponent, watch, ref, computed } from 'vue';
import { OperationStoreKey } from '~/store/useOperation';

export default defineComponent({
    name: 'PageLayout',
    components: {
    },
    props: {
        orientation: {
            type: String as PropType<Orientation>,
            required: true,
        }
    },
    setup(props) {
        const pageRef = ref<HTMLDivElement>();
        const aspectRatio = computed(() => {
            if (props.orientation === 'portrait') {
                return '595 /842';
            } else {
                return '842 / 595';
            }
        })

        const styleElement = ref<HTMLElement|null>(null);
        const operationStore = inject(OperationStoreKey);

        const setupPage = () => {
            if (!process.client) return;
            if (!pageRef.value) return;
            const rect = pageRef.value.getBoundingClientRect();

            if (styleElement.value) {
                document.head.removeChild(styleElement.value);
            }
            const style = document.createElement('style');
            const widthPt = props.orientation === 'landscape' ? 842 : 595;
            const fontNum = 60;
            if (operationStore) {
                operationStore.calendarBaseFontSize.value = rect.width / fontNum;
            }

            style.innerHTML = `
                // html {
                //     font-size: calc(${rect.width}px / ${fontNum}) !important;
                // }

                @media print {
                    @page {size: A4 ${props.orientation}}
                    html {
                        font-size: calc(${widthPt}pt / ${fontNum}) !important;
                    }
                }
            `;
            document.head.appendChild(style);

            styleElement.value = style;
            console.log('style', rect.width/fontNum, style);
        }

        onMounted(() => {
            setupPage();
            window.addEventListener('resize', setupPage);
        })

        onUnmounted(() => {
            if (styleElement.value) {
                document.head.removeChild(styleElement.value);
            }
            window.removeEventListener('resize', setupPage);
        })

        watch(() => props.orientation, () => {
            console.log('watch', props.orientation)
            setupPage();
        })

        return {
            pageRef,
            aspectRatio,
        }
    },
});
</script>

<style lang="scss" module>
.page {
    width: calc(100% - 1pt);    // かつかつだとページが増えてしまう場合があるので
    aspect-ratio: v-bind(aspectRatio);
    border: 1px solid #eee;
    box-sizing: border-box;

    break-after: always;
    &:last-child {
        page-break-after: auto;
    }
}

@media print {
    .page {
        border: none;
    }

    @page {
        margin: 0;
        padding: 0;
    }
}

</style>
