<template>
    <PageLayout orientation="portrait">
        <div :class="$style.container">
            {{ year }}
            {{ title }}
        </div>
    </PageLayout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { OperationStoreKey } from '@/store/useOperation';
import PageLayout from '../common/PageLayout.vue';
import { StyleStoreKey } from '~/store/useStyle';

export default defineComponent({
    name: 'CoverPage',
    components: { PageLayout },
    setup() {
        const operationStore = inject(OperationStoreKey);
        const styleStore = inject(StyleStoreKey);

        const year = computed(() => {
            return operationStore?.yearMonth.value.year;
        });

        const fontStyle = computed(() => {
            return styleStore?.yearlyDefine.value.fonts.coverTitle;
        });

        const fontFamily = computed(() => {
            return fontStyle.value?.fontFamily;
        })

        const fontSize = computed(() => {
            return fontStyle.value?.fontSize + 'rem';
        })

        const color = computed(() => {
            return fontStyle.value?.color;
        })

        const title = computed(() => {
            return styleStore?.yearlyDefine.value.coverTitle;
        })

        return {
            year,
            fontFamily,
            fontSize,
            color,
            title,
        };
    },
});
</script>

<style lang="scss" module>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: v-bind(fontFamily);
    font-size: v-bind(fontSize);
    color: v-bind(color);
}
</style>
