<template>
  <v-app>
      <v-main :class="$style.container">
          <menu-bar :class="$style.menu" />
          <div :class="$style.main">
            <NuxtPage />
          </div>
      </v-main>
      <WebFontLoader />
  </v-app>
</template>

<script lang="ts">
import MenuBar from './components/MenuBar.vue';
import useStyle, { StyleStoreKey } from './store/useStyle';
import useOperation, { OperationStoreKey } from './store/useOperation';

export default defineComponent({
    setup() {
        const operationStore = useOperation();
        provide(OperationStoreKey, operationStore);
        provide(StyleStoreKey, useStyle( { operation: operationStore }));
        return {};
    },
    components: {
        MenuBar,
        WebFontLoader: () => process.client && import('@/components/common/WebFontLoader.vue'),
    }
})
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
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
</style>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: 1;
  height: calc(100vh - 50px);
}
.menu {
  height: 50px;
}
@media print {
  .menu {
    display: none;
  }
}

</style>