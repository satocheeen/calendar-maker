<template>
    <client-only>
        <v-app-bar :elevation="1" absolute>
            <template v-slot:prepend v-if="isSp">
                <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Calendar Maker</v-app-bar-title>

            <template v-if="!isSp">
                <v-list-item to="/">Top</v-list-item>
                <v-list-item to="/monthly">Monthly</v-list-item>
                <v-list-item to="/yearly">Yearly</v-list-item>
                <v-list-item to="/cover">Cover</v-list-item>

                <v-divider inset vertical></v-divider>

                <client-only>
                    <v-tooltip :text="explain">
                        <template v-slot:activator="{ props }">
                            <v-btn icon @click="printOut" v-bind="props" :disabled="disablePrintOut">
                                <v-icon>mdi-printer</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>

                    <v-tooltip text="設定読込">
                        <template v-slot:activator="{ props }">
                            <v-btn icon @click="onFileReadClick" v-bind="props">
                                <v-icon>mdi-upload</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>

                    <v-tooltip text="設定出力">
                        <template v-slot:activator="{ props }">
                            <v-btn icon @click="onFileOutput" v-bind="props">
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </client-only>
            </template>

        </v-app-bar>

        <v-navigation-drawer
            location="left"
            v-model="showDrawer"
            v-if="isSp"
        >
            <v-list-item to="/">Top</v-list-item>
            <v-list-item to="/monthly">Monthly</v-list-item>
            <v-list-item to="/yearly">Yearly</v-list-item>
            <v-list-item to="/cover">Cover</v-list-item>

            <v-divider></v-divider>

            <v-list-item @click="printOut">
                印刷
                <template v-slot:append>
                    <v-icon icon="mdi-printer"></v-icon>
                </template>
            </v-list-item>

            <v-list-item @click="onFileReadClick">
                設定読込
                <template v-slot:append>
                    <v-icon icon="mdi-upload"></v-icon>
                </template>
            </v-list-item>

            <v-list-item @click="onFileOutput">
                設定出力
                <template v-slot:append>
                    <v-icon icon="mdi-download"></v-icon>
                </template>
            </v-list-item>

        </v-navigation-drawer>
    </client-only>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import NavLink from './common/NavLink.vue';
import { StyleStoreKey } from '../store/useStyle';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';

export default defineComponent({
    name: 'MenuBar',
    components: { NavLink },
    setup() {
        const showDrawer = ref(false);
        const styleStore = inject(StyleStoreKey);
        const isSp = useMediaQuery('(max-width: 680px)')

        const route = useRoute();

        const onFileOutput = () => {
            styleStore?.output();
        }

        const onFileReadClick = () => {
            styleStore?.load();
        }

        const printOut = () => {
            window.print();
        }

        const disablePrintOut = computed(() => {
            return route.path === '/';
        })

        const explain = computed(() => {
            const message = '印刷プレビュー画面を表示します。'
            if (route.path === '/monthly') {
                return message + '「背景のグラフィックス」を印刷するように指定してください。'
            }
            return message;
        })

        return {
            isSp,
            showDrawer,
            onFileOutput,
            onFileReadClick,
            printOut,
            explain,
            disablePrintOut,
        }

    }
});
</script>
