<template>
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
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import NavLink from './common/NavLink.vue';
import { StyleStoreKey } from '../store/useStyle';
import { useRoute } from 'vue-router';
import { OperationStoreKey } from '@/store/useOperation';

export default defineComponent({
    name: 'MenuBar',
    components: { NavLink },
    setup() {
        const showDrawer = ref(false);
        const styleStore = inject(StyleStoreKey);
        const operationStore = inject(OperationStoreKey);
        const isSp = computed(() => operationStore?.isSp);

        const route = useRoute();
        const showMenu = computed(() => {
            return route.path !== '/';
        })

        const onFileOutput = () => {
            styleStore?.output();
        }

        const onFileReadClick = () => {
            styleStore?.load();
        }

        return {
            isSp,
            showDrawer,
            onFileOutput,
            onFileReadClick,
            showMenu,
        }

    }
});
</script>
