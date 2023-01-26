import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails (){
    const {basket, setBasket, removeItem} = useStoreContext();
    const{id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const[loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if(item) setQuantity(item.quantity);
        const idValue = id || '';
        agent.Catalog.details(parseInt(idValue))
        .then(response => setProduct(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));          
    }, [id])


  function handleItemChange(event: any){
    if(event.target.value >= 0){
        setQuantity(parseInt(event.target.value));
    }
  }
  
  function handleUpdateCart(){
    setSubmitting(true);
    if(!item || quantity > item.quantity){
        const updatedQuantity = item ? quantity - item.quantity : quantity;
        agent.Basket.addItem(product?.id!,updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }else{
        const updatedQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!,quantity))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }
  }
if(loading) return <LoadingComponent message='Loading Product...'/>
if(!product) return <h3>Product not found</h3>
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
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton sx={{height: '55px'}}
                        disabled={item?.quantity === quantity || !item && quantity === 0}
                        onClick={handleUpdateCart}
                        loading={submitting}
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