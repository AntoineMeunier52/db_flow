import { isFunctionOrConstructorTypeNode } from "typescript";

export const useFlowViewport = () => {
  const viewportTransform = useState<ViewportTransform>(
    "viewportTransform",
    () => ({ x: 0, y: 0, zoom: 1 })
  );

  const isClick = ref(false);

  // update zoom and viewport position based on wheel event
  function handleZoom(
    event: WheelEvent,
    minZoom = 1,
    maxZoom = 3,
    zoomSpeed = 0.05
  ) {
    event.preventDefault();

    //delta normalization
    const perLine = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
    const perPage = event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? 360 : 1;
    const deltaY = event.deltaY * perLine * perPage;

    const direction = deltaY < 0 ? 1 : -1;

    const zoomFactor = Math.exp(direction * zoomSpeed);

    const oldZoom = viewportTransform.value.zoom;
    let newZoom = oldZoom * zoomFactor;

    newZoom = Math.min(Math.max(newZoom, minZoom), maxZoom);
    if (newZoom === oldZoom) return;

    // calculate the mouse position relative to the viewport
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const dx = (offsetX - viewportTransform.value.x) / oldZoom;
    const dy = (offsetY - viewportTransform.value.y) / oldZoom;

    viewportTransform.value.x = offsetX - dx * newZoom;
    viewportTransform.value.y = offsetY - dy * newZoom;
    viewportTransform.value.zoom = newZoom;
  }

  const setClick = () => (isClick.value = true);
  const unsetClick = () => (isClick.value = false);

  function handleDrag(event: MouseEvent) {
    if (!isClick.value) return;

    viewportTransform.value.x += event.movementX;
    viewportTransform.value.y += event.movementY;
  }

  return {
    viewportTransform,
    handleZoom,
    handleDrag,
    setClick,
    unsetClick,
    isClick,
  };
};
