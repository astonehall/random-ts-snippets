export const getAspectRatioFromDataUrl = (dataUrl: string) => {
  const img = new Image();
  img.src = dataUrl;

  const aspect = img.width / img.height;

  if (!isNaN(aspect)) {
    return (img.width / img.height).toFixed(1);
  }
};

