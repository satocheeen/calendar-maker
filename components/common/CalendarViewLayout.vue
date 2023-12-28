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
    name: 'CalendarViewLayout'
});
</script>

<style lang="scss" module>
$sidebarWidth: 20rem;

.container {
    display: flex;
    justify-content: space-between;

    overflow: hidden;
    width: 100vw;
    height: 100%;
}
@media print {
    .container {
        overflow: auto;
        width: unset;
        height: unset;
    }
}
.calendar {
    width: calc(100vw - ($sidebarWidth + 2px));
    box-sizing: border-box;
    overflow-y: auto;
    user-select: none;

    // border: 1px solid blue;
}
.sidebar {
    box-sizing: border-box;
    width: $sidebarWidth;
    overflow-y: scroll;

    text-align: left;
    font-size: 16px;

    border-left: 1px solid #ddd;
    // box-shadow: -1px 5px 5px #aaa;
}
@media print {
    .sidebar {
        display: none;
    }
    .calendar {
        width: 100%;
    }
}
</style>
