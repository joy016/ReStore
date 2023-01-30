import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  debounce,
} from "@mui/material";
import { useAppDispatch } from "../../app/redux/ConfigureStore";
import { setProductParams } from "../../app/redux/slices/catalogSlice";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export default function ProductSort({
  options,
  onChange,
  selectedValue,
}: Props) {
  const dispatch = useAppDispatch();

  const debouncedSort = debounce((event: any) => {
    dispatch(setProductParams({ Sort: event.target.value }));
  }, 1000);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      debouncedSort(event);
    }
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="name"
        onChange={onChange}
        value={selectedValue}
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
            onKeyPress={handleKeyPress}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
