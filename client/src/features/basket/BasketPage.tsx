import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../../app/redux/slices/basketSlice";
import { currencyFormat } from "../../app/util/Util";
import BasketSummary from "./BasketSummary";

export default function BasketPage(){
   const dispatch = useAppDispatch();
   const {basket, status} = useAppSelector(state => state.basket)

    if(!basket) return <Typography variant='h3'>Your Basket is empty</Typography>
    return(
      <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src= {item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                    <span>{item.name}</span>
                  </Box>

                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                    <LoadingButton color='error' 
                    loading={status ==='pendingRemoveItem' + item.productId + 'Rem'} 
                    onClick={() => dispatch(removeBasketItemAsync({
                      productId: item.productId, 
                      quantity: 1,
                      name: 'Rem'
                      }))} >
                        <Remove/>
                    </LoadingButton>
                        {item.quantity}
                    <LoadingButton color='secondary' 
                    loading={status.includes('pendingAddItem' + item.productId)} 
                    onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                        <Add/>
                    </LoadingButton>
                </TableCell>    
                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                    <LoadingButton color='error' 
                     //loading={status.loading && status.name === 'del' + item.productId} 
                     loading={status ==='pendingRemoveItem' + item.productId + 'Del'} 
                     onClick={() => dispatch(removeBasketItemAsync({
                      productId:item.productId,
                      quantity: item.quantity,
                      name: 'Del'
                       }))} >
                        <Delete/>
                    </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container >
          <Grid item xs={6}/>
          <Grid item xs={6}>
            <BasketSummary />
            <Button component={Link} to ='/checkout'
            variant="contained"
            size="large"
            fullWidth>
              Checkout
            </Button>
          </Grid>
      </Grid>
      
      </>
    )
}

