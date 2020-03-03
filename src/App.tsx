import * as React from 'react';
import UserC from './user'
export const UserContext = React.createContext(null);

export type UserType = {
  id: number;
  title: string;
};

type State = {
  users: UserType[];
};


type Action =
  | { type: 'ADD_USER'; title: string }
  | { type: 'DELETE_USER'; id: number }
  ;

const initialState: State = {
  users: [
    { id: 1, title: 'Roger' },
    { id: 2, title: 'Russell' },
    { id: 3, title: 'Clyde' },
    { id: 4, title: 'Ted' },
    { id: 5, title: 'Elizabeth' },
    { id: 6, title: 'Simon' },
    { id: 7, title: 'Bobbie' },
  ]

};

let nextId = 6;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, { id: nextId++, title: action.title }],
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };
    default:
      return state;
  }
};


const App: React.FC = () => {
  const [users, dispatch] = React.useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ userState: users, userDispatch: dispatch }}>
      <div>
      <UserC />
      </div>
    </UserContext.Provider>
  )
};

export default App;
