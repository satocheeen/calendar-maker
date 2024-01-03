<template>
    <div :class="$style.container">
        <h1>Calendar Maker</h1>
        <p>
            あなたオリジナルのカレンダーを。
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

        <h2>留意事項</h2>
        <ul>
            <li>
                印刷時は、「背景グラフィックを印刷する」設定にしてください。
            </li>
            <li>
                PC上の見た目と印刷時の見た目は若干異なります。<br/>
                必ず印刷前に印刷プレビューでご確認ください。
            </li>
            <li>
                ブラウザによっても見た目や印刷結果が異なります。<br/>
                印刷がうまくいかない場合は、別のブラウザも試してみてください。
            </li>
            <li>
                2025年以降の祝日については、変更の可能性がある旨、ご留意ください。
            </li>
        </ul>

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

    h2 {
        margin: auto;
        margin-top: 5rem;
        border-bottom: 1px solid #ddd;
        // max-width: 20rem;
    }

    p {
        margin: 1rem;
    }

    ul {
        list-style: none;
        margin-top: 2rem;
        // text-align: left;

        li {
            &::before {
                content: '*';
            }
            margin-bottom: 1rem;
        }
    }

}
@media screen and (max-width:500px) {
    .container {
        padding: 0;
        padding-top: 2rem;
        max-width: unset;
    }
}

</style>
