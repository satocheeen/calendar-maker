<template>
    <ClientOnly>
        <v-select
            :label="$props.label"
            :items="fonts"
            v-model="currentValue"
        >
            <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :style="{ fontFamily: item.value }"
                    :subtitle="item.value"
                    title="123ABCabc日月火"
                />
            </template>
        </v-select>
    </ClientOnly>
</template>

<script lang="ts">
import { SystemFontNameList, WebFontNameList } from '@/store/font_define';
import { computed } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FontSelect',
    props: {
        label: {
            type: String,
        },
        modelValue: {
            type: String,
        }
    },
    emits: {
        // eslint-disable-next-line
        'update:modelValue': (val: string|undefined) => true,
    },
    setup(props, { emit }) {
        const currentValue = computed({
            get() {
                return props.modelValue;
            },
            set(val) {
                emit('update:modelValue', val);
            }
        })

        const fonts = computed(() => {
            return [...SystemFontNameList, ...WebFontNameList];
        })

        return {
            currentValue,
            fonts,
        }
    }

});
</script>

<style lang="scss" module></style>
