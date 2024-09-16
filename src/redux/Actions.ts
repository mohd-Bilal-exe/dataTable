// actions.ts
export const SELECT_ITEM = 'SELECT_ITEM';
export const DESELECT_ITEM = 'DESELECT_ITEM';

// Typed action creators
export const selectItem = (id: string) => ({
  type: SELECT_ITEM,
  payload: id,
});

export const deselectItem = (id: string) => ({
  type: DESELECT_ITEM,
  payload: id,
});
