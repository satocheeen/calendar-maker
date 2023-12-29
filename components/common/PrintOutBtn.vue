<template>
    <div :class="$style.container">
        <client-only>
            <v-tooltip activator="" :text="explain">
                <template v-slot:activator="{ props }">
                    <v-btn @click="printOut" v-bind="props">印刷</v-btn>
                </template>
            </v-tooltip>
        </client-only>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PrintOutBtn',
    setup() {
        const route = useRoute();

        const printOut = () => {
            window.print();
        }

        const explain = computed(() => {
            const message = '印刷プレビュー画面を表示します。'
            if (route.path === '/monthly') {
                return message + '「背景のグラフィックス」を印刷するように指定してください。'
            }
            return message;
        })
        return {
            printOut,
            explain,
        }
    }
});
</script>

<style lang="scss" module>
.container {
    display: flex;
    justify-content: center;
}
</style>
