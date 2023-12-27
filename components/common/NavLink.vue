<template>
    <v-list-item
        v-if="isCurrentPage"
        :class="['text-button', $style.navItem, $style.current]"
    >
        <slot />
    </v-list-item>
    <v-list-item
        v-else
        :to="$props.to"
        variant="plain"
        :class="['text-button', $style.navItem, isCurrentPage ? '' : 'text-secondary']"
        >
        <slot />
    </v-list-item>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'NavLink',
    props: {
        to: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const route = useRoute();
        const isCurrentPage = computed(() => {
            return route.path === props.to;
        })

        return {
            isCurrentPage,
        }
    }
});
</script>

<style lang="scss" module>
.navItem {
    font-size: 16px !important;
    text-decoration: underline;

    &.current {
        text-decoration: none;
    }
}
</style>
