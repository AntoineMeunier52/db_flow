<template>
  <div
    class="absolute h-full w-full top-0 left-0 z-10 overflow-clip"
    @wheel.prevent="handleMouseWheel"
    @mousemove.prevent="handleDrag"
    @mousedown.prevent="setClick"
    @mouseup.prevent="unsetClick"
    @mouseleave.prevent="unsetClick"
  >
    Viewport
  </div>
</template>

<script lang="ts" setup>
const { handleZoom, handleDrag, setClick, unsetClick } = useFlowViewport();

function handleMouseWheel(event: WheelEvent) {
  handleZoom(event);
}
</script>

<style></style>
