import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import { RootState } from "../ConfigureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductAsync',
    async (_, thunkAPI) => {
        try {
          return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)    

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchSingleProductAsync',
    async (productId, thunkAPI) => {
        try {
          return await agent.Catalog.details(productId);
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)   

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductAsync.pending, (state) =>{ 
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) =>{
            productAdapter.setAll(state, action.payload);
            state.status = 'idle'
            state.productsLoaded = true
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle'
        });
        builder.addCase(fetchSingleProductAsync.pending, (state) => {
            state.status = 'pendingFetchSingleProduct' 
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state,action) => {
            productAdapter.upsertOne(state, action.payload)
            state.status = 'idle' 
            state.productsLoaded = true
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle'
        })
    })

})

export const productSelector = productAdapter.getSelectors((state: RootState) => state.catalog)

