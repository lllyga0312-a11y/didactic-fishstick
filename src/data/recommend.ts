// Estimator rule: application + special needs -> scene whose build-up to show.
// Kept free of imports so the browser bundle stays tiny.

export type Scene = 'plant' | 'warehouse' | 'carpark' | 'food' | 'esd' | 'chemical';

export function recommend(scene: Scene, needs: { heavy: boolean; esd: boolean; chem: boolean }): Scene {
  if (needs.esd) return 'esd';
  if (needs.chem) return 'chemical';
  return scene;
}
