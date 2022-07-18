export type ItemState = {
  loading: boolean;
  currentItem: string;
  items: string[];
  error: any;
};

export const INITIAL_ITEM_STATE: ItemState = {
  loading: false,
  currentItem: "first",
  items: [],
  error: null
};

export type AddItem = {
  readonly type: "AddItem";
  readonly payload: {
    loading: boolean; currentItem: string; items: string[];
  }
};

export type ItemAction = AddItem;

export const itemReducer = (iniItemState: ItemState = INITIAL_ITEM_STATE, action: ItemAction): ItemState => {
  switch (action.type) {
    case "AddItem": {
      return {
        ...iniItemState,
        ...action.payload,
        error: null
      }
    }
    default: return iniItemState;
  }
};

