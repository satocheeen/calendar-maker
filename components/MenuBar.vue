<template>
    <div :class="$style.menuBar">
        <div :class="$style.nav">
            <nav-link to="/">Top</nav-link>
            <nav-link to="/monthly">Monthly</nav-link>
            <nav-link to="/yearly">Yearly</nav-link>
            <nav-link to="/cover">Cover</nav-link>
        </div>
        <div :class="$style.menu" v-if="showMenu">
            <client-only>
                <v-tooltip activator="" text="設定出力">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            variant="plain" color="secondary"
                            icon="mdi-download"
                            @click="onFileOutput"
                        />
                    </template>
                </v-tooltip>
                <v-tooltip activator="" text="設定読込">
                    <template v-slot:activator="{ props }">
                        <v-btn
                        v-bind="props"
                            variant="plain" color="secondary"
                            icon="mdi-upload"
                            @click="onFileReadClick"
                        />
                    </template>
                </v-tooltip>
            </client-only>
        </div>
    </div>    
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import NavLink from './common/NavLink.vue';
import { StyleStoreKey } from '../store/useStyle';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'MenuBar',
    components: { NavLink },
    setup() {
        const styleStore = inject(StyleStoreKey);

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
            onFileOutput,
            onFileReadClick,
            showMenu,
        }

    }
});
</script>

<style lang="scss" module>
.menuBar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100vw;
    height: 100%;
    overflow-x: auto;

    border-bottom: 1px solid #ddd;
    font-size: 16px;
}
.nav {
    grid-column: 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.menu {
    grid-column: 3 / 4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
}
</style>
