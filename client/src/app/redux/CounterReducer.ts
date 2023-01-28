
export const INCREMENT_NUMBER = "INCREMENT_NUMBER"
export const DECREMENT_NUMBER = "DECREMENT_NUMBER"

 export interface CounterState {
    data: number,
    tittle: string
}

// set value of initial state 

const initialState: CounterState = {
    data: 100,
    tittle: 'Cinderella'
}

// Writing reducer 
export default function CounterReducer(state = initialState, action: any){
    switch (action.type) {
        case INCREMENT_NUMBER:
            return {
                ...state,
                data: state.data + 1
            }
            case DECREMENT_NUMBER:
                return {
                    ...state,
                    data: state.data - 1
                }
            default:
                return state;
    }
}