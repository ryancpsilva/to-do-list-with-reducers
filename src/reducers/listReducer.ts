import { Item } from "@/types/Item";

type AddAction = {
  type: 'add',
  payload: {
    txt: string;
  };
};

type EditTextAction = {
  type: 'editText',
  payload: {
    id: number;
    newTxt: string;
  };
};

type ToggleDoneAction = {
  type: 'toggleDone',
  payload: {
    id: number;
  };
};

type RemoveAction = {
  type: 'remove',
  payload: {
    id: number;
  };
};

type ListActions = AddAction | EditTextAction | ToggleDoneAction | RemoveAction;

export const listReducer = (list: Item[], action: ListActions): Item[] => {
  switch (action.type) {
    case "add":
      return [
        ...list,
        {
          id: list.length,
          txt: action.payload.txt,
          done: false
        }
      ];

    case "editText":
      return list.map(t =>
        t.id === action.payload.id
          ? { ...t, txt: action.payload.newTxt }
          : t
      );

    case "toggleDone":
      return list.map(t =>
        t.id === action.payload.id
          ? { ...t, done: !t.done }
          : t
      );

    case "remove":
      return list.filter(t => t.id !== action.payload.id);

    default:
      return list;
  }
};
