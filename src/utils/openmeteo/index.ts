export function values(
  v: { valuesArray?: () => Float32Array | null } | null | undefined,
): number[] {
  return Array.from(v?.valuesArray?.() ?? []);
}
