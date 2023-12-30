<template>
    <PrintOutBtn />

    <v-container fluid>
        <YearSelect />
        <v-divider :class="$style.divider" />

        <CoverFontSettingItem
            label="フォント"
        />

        <v-textarea
            label="タイトル"
            v-model="title"
        />

    </v-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrintOutBtn from '../common/PrintOutBtn.vue';
import YearSelect from '../common/YearSelect.vue';
import CoverFontSettingItem from './CoverFontSettingItem.vue';
import { StyleStoreKey } from '~/store/useStyle';

export default defineComponent({
    name: 'CoverSettingPanel',
    components: { PrintOutBtn, YearSelect, CoverFontSettingItem },
    setup() {
        const styleStore = inject(StyleStoreKey);
        const title = computed({
            get() {
                return styleStore?.yearlyDefine.value.cover.title;
            },
            set(val) {
                styleStore?.updateYearlyDefine({
                    cover: {
                        title: val,
                    },
                })
            }
        })

        return {
            title
        }
    }
});
</script>

<style lang="scss" module>
.divider {
    width: 50%;
    margin: 1em auto;
}

</style>
