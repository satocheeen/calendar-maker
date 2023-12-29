<template>
    <PrintOutBtn />

    <v-container fluid>
        <YearSelect />
        <v-divider :class="$style.divider" />

        <FontSettingItemForYear
            label="フォント"
            target="coverTitle"
        />

        <v-text-field
            label="タイトル"
            v-model="title"
        />

    </v-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrintOutBtn from '../common/PrintOutBtn.vue';
import YearSelect from '../common/YearSelect.vue';
import FontSettingItemForYear from '../year-calendar/FontSettingItemForYear.vue';
import { StyleStoreKey } from '~/store/useStyle';

export default defineComponent({
    name: 'CoverSettingPanel',
    components: { PrintOutBtn, YearSelect, FontSettingItemForYear },
    setup() {
        const styleStore = inject(StyleStoreKey);
        const title = computed({
            get() {
                return styleStore?.yearlyDefine.value.coverTitle;
            },
            set(val) {
                styleStore?.updateYearlyDefine({
                    coverTitle: val,
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
