import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Divider, Grid, Table, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../../app/redux/slices/basketSlice";
import { fetchSingleProductAsync, productSelector } from "../../app/redux/slices/catalogSlice";

export default function ProductDetails (){
    const {basket,status} = useAppSelector(state => state.basket);
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const{id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelector.selectById(state, id!));
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if(item) setQuantity(item.quantity);
        if(!product) dispatch(fetchSingleProductAsync(parseInt(id!)))         
    }, [id, item, dispatch, product])

  function handleItemChange(event: any){
    if(event.target.value >= 0){
        setQuantity(parseInt(event.target.value));
    }
  }
  
    function handleUpdateCart(){
        if(!item || quantity > item.quantity){
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }else{
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: quantity, name: 'Rem' }))
        }
    }

if(productStatus.includes('pendingFetchSingleProduct')) return <LoadingComponent message='Loading Product...'/>
if(!product) return <Alert severity="success" color="info">
                    This is a success alert — check it out!
                    </Alert>
//<h3>Oooopss Product not found</h3>
    
    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='Secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleItemChange}
                            variant='outlined'
                            type='number'
                            label="Quantity in Cart"
                            defaultValue="Hello World"
                            fullWidth
                            value={quantity}
                            //value={baske}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton sx={{height: '55px'}}
                        disabled={item?.quantity === quantity || !item && quantity === 0}
                        onClick={handleUpdateCart}
                        loading={status.includes('pendingAddItem')}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth>
                             {item ? 'UPDATE QUANTITY' : 'ADD TO CART'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}