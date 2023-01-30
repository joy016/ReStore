import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function FilterProductBrand({
  items,
  onChange,
  checked,
}: Props) {
  const [checkItems, setCheckItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkItems.findIndex((item) => item === value);
    let newCheckItems: string[] = [];
    if (currentIndex === -1) newCheckItems = [...checkItems, value];
    else newCheckItems = checkItems.filter((item) => item !== value);

    setCheckItems(newCheckItems);
    onChange(newCheckItems);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handleChecked(item)}
              checked={checkItems.indexOf(item) !== -1}
            />
          }
          key={item}
          label={item}
        />
      ))}
    </FormGroup>
  );
}
