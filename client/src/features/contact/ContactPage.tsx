import { Button, ButtonGroup, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { CounterState, DECREMENT_NUMBER, INCREMENT_NUMBER } from "../../app/redux/CounterReducer";

export default function ContactPage (){
    const dispatch = useDispatch();
    const {data, tittle} = useSelector((state: CounterState) => state);

    return(
        <>
            <Typography variant="h2">
                {tittle}
            </Typography>
            <Typography variant="h2">
                {data}
            </Typography>
            <ButtonGroup>
                <Button color="primary" onClick={() => dispatch({type: INCREMENT_NUMBER})}>Increment</Button>
                <Button color="error" onClick={() => dispatch({type: DECREMENT_NUMBER})}>Decrement</Button>
            </ButtonGroup>
        </>
      
    )
}