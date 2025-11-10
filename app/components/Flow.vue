<template>
  <div class="h-full w-full">
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
