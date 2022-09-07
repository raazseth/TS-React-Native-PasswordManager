import React, {createContext, useReducer} from 'react';
import {IPassword} from './Types';

interface ContextType {
  state?: {
    Items: IPassword[];
    loading?: boolean;
    error?: null;
    isAuth: boolean;
    auth: any;
  };
  dispatch?: React.Dispatch<{type: string; value: unknown}>;
}

export const Store = createContext<ContextType | any>(null);

const initialState = {
  Items: [],
  auth: null,
  isAuth: false,
  loading: false,
  error: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'AUTHENTICATING_USER': {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        auth: action.payload.auth,
      };
    }
    case 'IS_AUTH': {
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    }
    case 'ADD_PASSWORD': {
      return {
        ...state,
        Items: action.payload.Items,
      };
    }

    case 'UPDATE_PASSWORD': {
      return {
        ...state,
        Items: action.payload.Items,
      };
    }

    case 'GET_PASSWORD': {
      return {
        ...state,
        Items: action.payload.Items,
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
  );
}
