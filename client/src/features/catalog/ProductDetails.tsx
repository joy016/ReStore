import { Divider, Grid, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails (){
const{id} = useParams<{id: string}>();
const [product, setProduct] = useState<Product | null>(null);
const[loading, setLoading] = useState(true);

useEffect(() => {
    const idValue = id || '';
    agent.Catalog.details(parseInt(idValue))
    .then(response => setProduct(response))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));          
}, [id])

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
            </Grid>
        </Grid>
    )
}