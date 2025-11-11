export const useFlowViewport = () => {
  const viewportTransform = useState<ViewportTransform>(
    "viewportTransform",
    () => ({ x: 0, y: 0, zoom: 1 })
  );

  //to add => zoom on the mouse position
  function handleZoom(event: WheelEvent, minZoom = 0.1, maxZoom = 4) {
    event.preventDefault();

    console.log("Zoom event:", event.deltaY, event);

    const zoomSensitivity = 0.001;
    if (event.deltaY > 0) {
      // Zooming out
      viewportTransform.value.zoom = Math.max(
        minZoom,
        viewportTransform.value.zoom * (1 - event.deltaY * zoomSensitivity)
      );
    } else {
      // Zooming in
      viewportTransform.value.zoom = Math.min(
        maxZoom,
        viewportTransform.value.zoom * (1 - event.deltaY * zoomSensitivity)
      );
    }
  }

  return { viewportTransform, handleZoom };
};
