<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useDropdown } from "@/composables/useDropdown";
  import Arrow from "@/assets/images/arrow.svg?component";
  import type { TOption } from "@/constants";

  const props = defineProps<{
    modelValue: string;
    items: ReadonlyArray<TOption>;
  }>();
  const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>();

  const model = ref<string>(props.modelValue);
  watch(
    () => props.modelValue,
    (v) => (model.value = v),
  );
  watch(model, (v) => {
    if (v != null) emit("update:modelValue", v);
  });

  const items = computed(() => props.items);
  const currentLabel = computed(() => items.value.find((i) => i.value === model.value)?.label);

  const { open, rootEl, toggle, select } = useDropdown<string>({ model });

  function onSelect(v: string) {
    select(v);
  }
</script>

<template>
  <div ref="rootEl" class="sel" :class="{ 'sel--open': open }">
    <button
      type="button"
      class="sel__control"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="sel__label">{{ currentLabel }}</span>
      <span class="sel__chevron"><Arrow /></span>
    </button>

    <ul v-if="open" class="sel__menu" role="listbox" @mousedown.stop>
      <li
        v-for="o in items"
        :key="o.value"
        class="sel__option"
        role="option"
        :aria-selected="o.value === model"
        :class="{ 'sel__option--selected': o.value === model }"
        @click="onSelect(o.value)"
      >
        <slot name="option" :option="o">{{ o.label }}</slot>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @use "@/assets/styles/mixin" as m;

  .sel {
    position: relative;
    width: 320px;

    &--open .sel__chevron {
      transform: rotate(0);
    }
  }

  .sel__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @include m.base-btn-padding;
    color: var(--color-primary);
    background: var(--color-gray-500);
    border-radius: var(--br-base);
    cursor: pointer;
    font-weight: 500;
    font-size: var(--font-size-lg);
  }

  .sel__chevron {
    margin-left: auto;
    transform: rotate(-90deg);
    @include m.transition-base;
  }

  .sel__menu {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 12px;
    max-height: 320px;
    overflow: auto;
    background: var(--color-gray-500);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--br-base);
    z-index: 10;
  }

  .sel__option {
    @include m.base-btn-padding;
    color: var(--color-primary);
    font-weight: 500;
    font-size: var(--font-size-lg);
    cursor: pointer;

    &:hover {
      background: var(--color-gray-400);
    }
    &--selected {
      background: var(--color-gray-400);
    }
  }
</style>
