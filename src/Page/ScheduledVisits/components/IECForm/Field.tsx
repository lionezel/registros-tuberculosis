import { TextField } from "@mui/material";
import { IECForm } from "./types";


interface FieldProps {
    label: string;
    name: keyof IECForm;
    value: any;
    onChange: (e: any) => void;
    select?: boolean;
    type?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}


export const Field = ({
    label,
    name,
    value,
    onChange,
    select = false,
    type = "text",
    disabled = false,
    children,
}: FieldProps) => (
    <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        select={select}
        type={type}
        disabled={disabled}
        InputLabelProps={type === "date" ? { shrink: true } : undefined}
    >
        {children}
    </TextField>
);


