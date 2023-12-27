<template>
  <v-app>
      <v-main :class="$style.container">
          <menu-bar :class="$style.menu" />
          <div :class="$style.main">
            <NuxtPage />
          </div>
      </v-main>
  </v-app>
</template>

<script lang="ts">
import MenuBar from './components/MenuBar.vue';
import useStyle, { StyleStoreKey } from './store/useStyle';
export default defineComponent({
    setup() {
        provide(StyleStoreKey, useStyle());
        return {};
    },
    components: { MenuBar }
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

// フォントの基準サイズがカレンダーに合わせて変わるので、コントロールパネルで使用するフォントサイズは単位をremからemに変更
.v-card-title {
  font-size: 1.1em !important;
}
.v-card-text, .v-btn--size-default, .text-button {
  font-size: 0.875em !important;
}
.v-input,.v-field,.v-label {
  font-size: 1em !important;
}
.v-overlay-contaier {
  * {
    font-size: 1em !important;
  }
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