import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            const event = action.payload;
            const existingItem = state.items.find(item => item.event.id === event.id);

            if (existingItem) {
                existingItem.quantity += 1;
            }else{
                state.items.push({ event, quantity: 1 });
            }
        },
    }
})