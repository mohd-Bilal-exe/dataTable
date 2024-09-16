// reducer.ts
import { AnyAction } from 'redux';
import { SELECT_ITEM, DESELECT_ITEM } from './Actions';

interface State {
  selectedItems: string[];
}

const initialState: State = {
  selectedItems: [],
};

// Reducer handling AnyAction for compatibility with Redux
const selectedItemsReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case DESELECT_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (id) => id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default selectedItemsReducer;
