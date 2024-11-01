// GENERIC
type UserType = {
  name: string;
  lastName: string;
};

type PhotoType = {
  large: number;
  small: number;
};

type ServerResponseType<D> = {
  statusCode: number;
  message: string;
  data: D;
};

const reponse1: ServerResponseType<UserType> = {
  statusCode: 0,
  message: "OK",
  data: {
    name: "Jack",
    lastName: "Grealish",
  },
};

const response2: ServerResponseType<PhotoType> = {
  statusCode: 0,
  message: "OK",
  data: {
    large: 50,
    small: 20,
  },
};

// CONDITIONAL TYPE
type NullableType<T> = null | T; // | и || разница?

const initialState = {
  name: "Vincent",
  age: 25,
  photo: null as NullableType<PhotoType>,
  user: null as NullableType<UserType>,
};
type InitialStateType = typeof initialState;

type ActionTypes = ReturnType<typeof AC1> | ReturnType<typeof AC2>;
// type ActionTypes = ReturnType<ActionsObjType<typeof actionsInfernExample>>  --> Better variant, explain in down

const reducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case "SET-AGE":
      return { ...state, age: action.age };
    case "SET-FULL-NAME":
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    default:
      return state;
  }
};

// RETURNTYPE of functions , AS CONST
const AC1 = (age: number) => ({ type: "SET-AGE", age }) as const;
const AC2 = (firstName: string, lastName: string) =>
  ({ type: "SET-FULL-NAME", firstName, lastName }) as const;

const action1: ActionTypes = { type: "SET-AGE", age: 21 };
const action2: ActionTypes = {
  type: "SET-FULL-NAME",
  firstName: "Johny",
  lastName: "Cage",
};

//INFERN
type MainType<T> = T extends "user" ? UserType : PhotoType;

let data1: MainType<"user"> = {
  name: "Dima",
  lastName: "Vasilev",
};

let data2: MainType<"photo"> = {
  large: 88,
  small: 22,
};

// manual analogue of ReturnType<typeof AC1>,       "LIKE A ReturnType<typeof ..>"
type MainReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
//-------------------------------------------------------------------------

//example infern with actions in object
const actionsInfernExample = {
  AC3: (age: number) => ({ type: "SET-AGE", age }) as const,
  AC4: (firstName: string, lastName: string) =>
    ({ type: "SET-FULL-NAME", firstName, lastName }) as const,
};

type ActionsObjType<T> = T extends { [key: string]: infer U } ? U : never;

let noNameObj: ReturnType<ActionsObjType<typeof actionsInfernExample>> = {
  type: "SET-AGE",
  age: 16,
};
