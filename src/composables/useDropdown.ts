import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";

export function useDropdown<T = string | number>(opts: { model: Ref<T | null> }) {
  const { model } = opts;

  const open = ref(false);
  const rootEl = ref<HTMLElement | null>(null);

  const toggle = () => (open.value = !open.value);
  const close = () => (open.value = false);
  const select = (v: T) => {
    model.value = v;
    close();
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as Node;
    if (rootEl.value && !rootEl.value.contains(t)) close();
  };
  onMounted(() => document.addEventListener("mousedown", onDocClick));
  onBeforeUnmount(() => document.removeEventListener("mousedown", onDocClick));

  return { open, rootEl, toggle, close, select };
}
