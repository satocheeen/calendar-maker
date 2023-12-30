<template>
    <v-app full-height>
        <div :class="$style.menu">
            <menu-bar />
        </div>
        <v-main>
            <div :class="$style.main">
                <NuxtPage />
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import MenuBar from './components/MenuBar.vue';
import useStyle, { StyleStoreKey } from './store/useStyle';
import useOperation, { OperationStoreKey } from './store/useOperation';
import { WebFontNameList } from './store/font_define';

export default defineComponent({
    components: {
        MenuBar,
    },
    setup() {
      onMounted(async() => {
          if (process.client) {
            // webfontloaderはクライアントサイドでなければimport失敗する
            // @ts-ignore
            const webFontLoader = await import('webfontloader') as any;
            webFontLoader.load({
              google: {
                families: WebFontNameList.map(font => (font.replaceAll(' ', '+') + ':400,700'))
              }
            })
          }
        })

        const operationStore = useOperation();

        provide(OperationStoreKey, operationStore);
        provide(StyleStoreKey, useStyle( { operation: operationStore }));
        return {
        };
    },
})
</script>

<style lang="scss">
// Vuetifyのデフォルトでoverflow-yになっているので、キャンセル
html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}
@media print {
    .v-overlay__content {
        display: none !important;
    }
}
</style>

<style lang="scss" module>
.main {
    flex: 1;
    height: calc(100vh - 90px);  // SP->56px, 48px
}
@media print {
    .menu {
      display: none;
    }

    .main {
        padding: 0;
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>