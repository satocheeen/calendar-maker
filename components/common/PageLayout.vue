<template>
    <div :class="$style.page">
        <slot />
    </div>
</template>

<script lang="ts">
import { type Orientation } from '@/store/types';
import { defineComponent, watch, ref, computed } from 'vue';

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
        const aspectRatio = computed(() => {
            if (props.orientation === 'portrait') {
                return '595 /842';
            } else {
                return '842 / 595';
            }
        })

        const styleElement = ref<HTMLElement|null>(null);
        watch(() => props.orientation, (val) => {
            if (!process.client) return;
            if (styleElement.value) {
                document.head.removeChild(styleElement.value);
            }
            const style = document.createElement('style');
            const widthPt = val === 'landscape' ? 842 : 595;
            const fontNum = 60;

            style.innerHTML = `
                html {
                    font-size: calc((100vw - 420px) / ${fontNum}) !important;
                }

                @media print {
                    @page {size: A4 ${val}}
                    html {
                        font-size: calc(${widthPt}pt / ${fontNum}) !important;
                    }
                }
            `;
            document.head.appendChild(style);

            styleElement.value = style;

        }, { immediate: true })

        return {
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
