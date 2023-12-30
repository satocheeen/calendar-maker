<template>
    <div :class="$style.container">
        <div :class="$style.calendar">
            <slot name="calendar" />
        </div>
        <div :class="$style.sidebar">
            <slot name="sidebar" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CalendarViewLayout',
});
</script>

<style lang="scss" module>

.container {
    display: grid;
    grid-template-columns: 1fr 350px;

    overflow: hidden;
    width: 100vw;
    height: 100%;
}

.calendar {
    grid-column: 1 / 2;

    box-sizing: border-box;
    overflow-y: auto;
    user-select: none;

    // border: 1px solid blue;
}
.sidebar {
    grid-column: 2 / 3;

    box-sizing: border-box;
    overflow-y: scroll;

    text-align: left;
    font-size: 16px;

    border-left: 1px solid #ddd;
    // box-shadow: -1px 5px 5px #aaa;
}

@media screen and (max-width:1000px) {
    .container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 300px;
    }
    .calendar {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .sidebar {
        grid-column: 1 / 2 !important;
        grid-row: 2 / 3;
        width: 100%;
        border-left: unset;
        border-top: 1px solid #ddd;
    }
}

@media print {
    .container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        overflow: none;
        width: 100%;
        height: unset;
    }

    .sidebar {
        display: none;
    }
    .calendar {
        width: 100%;
    }
}
</style>
