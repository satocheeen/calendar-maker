<template>
    <div :class="$style.container">
        <h1>Calendar Maker</h1>
        <p>
            あなたオリジナルのカレンダーを。
        </p>
        <p>
            ※PC上で動作させてください。
        </p>

        <h2>Monthly Calendar</h2>
        <p>
            月ごとのカレンダーを作ります。
        </p>
        <v-btn plain to="/monthly">はじめる</v-btn>

        <h2>Yearly Calendar</h2>
        <p>
            年間カレンダーを作ります。
        </p>
        <v-btn plain to="/yearly">はじめる</v-btn>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Home',
});
</script>

<style lang="scss" module>
.container {
    margin: auto;
    padding: 3rem;
    max-width: 50rem;
    text-align: center;
    font-family: 'Zen Maru Gothic';
    font-size: 16px;
    color: #333;
}
@media screen and (max-width:500px) {
    .container {
        padding: 0;
        padding-top: 2rem;
        max-width: unset;
    }
}

h2 {
    margin: auto;
    margin-top: 5rem;
    border-bottom: 1px solid #ddd;
    // max-width: 20rem;
}

p {
    margin: 1rem;
}
</style>
