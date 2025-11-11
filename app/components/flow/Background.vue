<template>
  <svg
    class="absolute top-0 left-0 z-0"
    :style="{
      height: `${height > 100 ? 100 : height}%`,
      width: `${width > 100 ? 100 : width}%`,
    }"
  >
    <defs>
      <slot id="flow-background" name="pattern-container">
        <pattern
          id="flow-background"
          :x="viewportTransform.x % background.scaledGap[0]"
          :y="viewportTransform.y % background.scaledGap[1]"
          :width="background.scaledGap[0]"
          :height="background.scaledGap[1]"
          patternUnits="userSpaceOnUse"
          :patternTransform="`translate(-${background.offset[0]}, -${background.offset[1]})`"
        >
          <slot name="pattern">
            <rect width="100%" height="100%" :fill="bgColor" />

            <template v-if="variant === 'dots'">
              <circle
                :cx="background.size / 2"
                :cy="background.size / 2"
                :r="background.size / 2"
                :fill="patternColor"
              />
            </template>

            <template v-else-if="variant === 'lines'">
              <path
                :stroke="patternColor"
                :stroke-width="lineWidth"
                :d="`M${background.scaledGap[0] / 2} 0 V${
                  background.scaledGap[1]
                } M0 ${background.scaledGap[1] / 2} H${
                  background.scaledGap[0]
                }`"
              />
            </template>
          </slot>
        </pattern>
      </slot>
    </defs>
    <rect width="100%" height="100%" fill="url(#flow-background)" />
  </svg>
</template>

<script lang="ts" setup>
import type {
  BackgroundProps,
  BackgroundVariant,
} from "~~/shared/types/Background";

const { viewportTransform } = useFlowViewport();

//from v3.4 descructure is enable to define defaults value
const {
  variant = "dots",
  gap = 20,
  size = 1,
  height = 100,
  width = 100,
  x = 0,
  y = 0,
  color: _patternColor,
  bgColor = "#fff",
  offset = 0,
  lineWidth = 1,
} = defineProps<BackgroundProps>();

/**
 * Logic taken from
 * https://github.com/bcakmakoglu/vue-flow/blob/master/packages/background/src/Background.vue
 */
const background = computed(() => {
  const zoom = viewportTransform.value.zoom;

  const [gapX, gapY] = Array.isArray(gap) ? gap : [gap, gap];
  const scaledGap: [number, number] = [gapX! * zoom, gapY! * zoom];

  const [offsetX, offsetY]: [number, number] = Array.isArray(offset)
    ? offset
    : [offset, offset];

  const scaledOffset: [number, number] = [
    offsetX! * zoom || 1 + scaledGap[0] / 2,
    offsetY! * zoom || 1 + scaledGap[1] / 2,
  ];

  const scaledSize = size * zoom;

  return {
    scaledGap,
    offset: scaledOffset,
    size: scaledSize,
  };
});

const DefaultBgColors: Record<BackgroundVariant, string> = {
  dots: "#81818a",
  lines: "#eee",
};

const patternColor = toRef(
  () => _patternColor || DefaultBgColors[variant || "dots"]
);
</script>

<style></style>
