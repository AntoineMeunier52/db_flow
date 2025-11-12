<template>
  <div
    class="absolute h-full w-full top-0 left-0 z-10 overflow-clip cursor-grab"
    :class="isClick ? 'cursor-grabbing' : ''"
    @wheel.prevent="handleMouseWheel"
    @mousemove.prevent="handleDrag"
    @mousedown.prevent="setClick"
    @mouseup.prevent="unsetClick"
    @mouseleave.prevent="unsetClick"
  >
    <node-wrapper />
  </div>
</template>

<script lang="ts" setup>
const { handleZoom, handleDrag, setClick, unsetClick, isClick } =
  useFlowViewport();

function handleMouseWheel(event: WheelEvent) {
  handleZoom(event);
}
</script>

<style></style>
