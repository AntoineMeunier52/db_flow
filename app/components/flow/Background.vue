<template>
  <svg
    :style="{
      height: `${height > 100 ? 100 : height}%`,
      width: `${width > 100 ? 100 : width}%`,
    }"
  >
    <defs>
      <slot id="flow-background" name="pattern-container">
        <pattern
          id="flow-background"
          x="1"
          y="1"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          :patternTransform="`translate(-${background.offset[0]}, -${background.offset[1]})`"
        >
          <slot name="pattern">
            <rect width="100%" height="100%" :fill="bgColor" />

            <template v-if="variant === 'dots'">
              <circle
                :cx="background.size / 2"
                :cy="background.size / 2"
                :r="background.dotRadius / 2"
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
  dotRadius = 1,
} = defineProps<BackgroundProps>();

const background = computed(() => {
  const zoom = 1; //later report the vieport zoom here
  const [gapX, gapY] = Array.isArray(gap) ? gap : [gap, gap];
  const scaledGap: [number, number] = [gapX! * zoom || 1, gapY! * zoom || 1];
  const scaledSize = size * zoom;
  const [offsetX, offsetY]: [number, number] = Array.isArray(offset)
    ? offset
    : [offset, offset];

  const scaledOffset: [number, number] = [
    offsetX * zoom || 1 + scaledGap[0] / 2,
    offsetY * zoom || 1 + scaledGap[1] / 2,
  ];

  const dotRadiusSize = dotRadius * scaledSize;

  return {
    scaledGap,
    offset: scaledOffset,
    size: scaledSize,
    dotRadius: dotRadiusSize,
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
