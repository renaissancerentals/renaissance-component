/** Widths (px) we ask Google's image CDN for. Kept apart from AssetService so tests that mock that module keep them. */
export const IMAGE_WIDTH = {thumb: 400, card: 800, large: 1600} as const;
