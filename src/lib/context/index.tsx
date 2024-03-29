import React, { createContext, Dispatch, useReducer, useContext } from 'react';

type ItemType = string | boolean | null;

type MainState = {
  category: ItemType;
  filter: ItemType;
  isList: ItemType;
  isDarkMode: ItemType;
  isMobileClient: ItemType;
};

const initialState: MainState = {
  category: 'overview',
  filter: null,
  isList: false,
  isDarkMode: false,
  isMobileClient: true,
};

const action = {
  filter: 'CHANGE_FILTER' as const,
  category: 'CHANGE_CATEGORY' as const,
  isList: 'SET_IS_LIST' as const,
  isDarkMode: 'SET_IS_DARK_MODE' as const,
  isMobileClient: 'SET_IS_MOBILE_CLIENT' as const,
};

type MainAction =
  | { type: 'CHANGE_FILTER'; payload: ItemType }
  | { type: 'CHANGE_CATEGORY'; payload: ItemType }
  | { type: 'SET_IS_LIST'; payload: ItemType }
  | { type: 'SET_IS_DARK_MODE'; payload: ItemType }
  | { type: 'SET_IS_MOBILE_CLIENT'; payload: ItemType };

type ActionDispatch = Dispatch<MainAction>;

const StateContext = createContext<MainState | undefined>(undefined);

const DispatchContext = createContext<ActionDispatch | undefined>(undefined);

const mainReducer = (state: MainState, { type, payload }: MainAction): MainState => {
  switch (type) {
    case 'CHANGE_FILTER':
      return { ...state, filter: payload };
    case 'CHANGE_CATEGORY':
      return { ...state, category: payload };
    case 'SET_IS_LIST':
      return { ...state, isList: payload };
    case 'SET_IS_DARK_MODE':
      return { ...state, isDarkMode: payload };
    case 'SET_IS_MOBILE_CLIENT':
      return { ...state, isMobileClient: payload };
    default:
      throw new Error('Unhandled action');
  }
};

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useContextState(type: keyof MainState): [ItemType, (state: ItemType) => void] {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (!state || !dispatch) throw Error('ContextProvider not found');
  const setState = (value: ItemType) => dispatch({ type: action[type], payload: value });
  return [state[type], setState];
}
