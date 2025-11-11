<template>
  <div class="relative h-full w-full overflow-hidden z-0 direction-ltr">
    <flow-viewport>
      <slot name="zoomable-pane" />
    </flow-viewport>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { BackgroundProps } from "#imports";

const props = defineProps<BackgroundProps>();
</script>

<style></style>
