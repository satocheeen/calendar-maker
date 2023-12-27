<template>
    <v-card>
        <v-card-title primary-title>
            フォント設定
        </v-card-title>
        <v-card-text>
            <FontSettingItem
                label="月（数字）"
                target="monthNum"
            />
            <FontSettingItem
                label="月（文字列）"
                target="monthCharacter"
            />
            <FontSettingItem
                label="年"
                target="year"
            />
            <FontSettingItem
                label="曜日"
                target="weekdayLabel"
            />
            <FontSettingItem
                label="日付"
                target="dateNum"
            />
            <FontSettingItem
                label="祝日名"
                target="eventName"
            />
        </v-card-text>
</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FontSettingItem from './FontSettingItem.vue';

export default defineComponent({
    name: 'FontSettingPanel',
    components: { FontSettingItem }
});
</script>

<style lang="scss" module></style>
