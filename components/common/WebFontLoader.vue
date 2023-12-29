<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import * as webFontLoader from 'webfontloader';
import { WebFontNameList } from '~/store/font_define';

export default defineComponent({
    name: 'WebFontLoader',
    setup() {
        onMounted(() => {
          if (process.client) {
            webFontLoader.load({
              google: {
                families: WebFontNameList.map(font => (font.replaceAll(' ', '+') + ':400,700'))
              }
            })
          }
        })
    }
});
</script>

<style lang="scss" module></style>
