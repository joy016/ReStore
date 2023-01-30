import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../models/basket";
import { getCookie } from "../../util/Util";


interface BasketState {
    basket: Basket | null,
    status: string,
}

// initial state
const initialState: BasketState = {
    basket: null,
    status: 'idle',

}


export const addBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity? : number}>(
    'basket/addBasketItemAsync',
    async({productId,quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId,quantity) 
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity? : number, name?: string}>( 
    'basket/removeBasketItemAsync',
    async({productId,quantity = 1},thunkAPI) => {
        try {
            return await agent.Basket.removeItem(productId, quantity)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
    },
      extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
                  console.log(action)  
                  state.status = 'pendingAddItem' + action.meta.arg.productId;
            });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.basket = action.payload;
            state.status = 'idle' 
            });
        builder.addCase(addBasketItemAsync.rejected, (state,action) => {
            // Add user to the state array
            console.log(action)
            state.status = 'idle'
        }); 
        builder.addCase(removeBasketItemAsync.pending, (state,action) => {

            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
          
        }); 
        builder.addCase(removeBasketItemAsync.fulfilled, (state,action) => {
            // Add user to the state array
            state.status = 'idle'
            const {productId,quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if(itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity!;
            if(state.basket!.items[itemIndex].quantity === 0)
            state.basket!.items.splice(itemIndex, 1);
        }); 
        builder.addCase(removeBasketItemAsync.rejected, (state,action) => {
            // Add user to the state array
            console.log(action)
            state.status = 'idle'
        }); 

    })           
})

export const {setBasket} = basketSlice.actions