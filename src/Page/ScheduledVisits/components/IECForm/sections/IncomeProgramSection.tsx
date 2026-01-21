import { Stack, Typography, MenuItem } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
}


export const IncomeProgramSection = ({ form, onChange }: Props) => (
    <Stack spacing={2} p={2}>
        <Typography fontSize={14} fontWeight={600}>Programas de ingresos</Typography>

        <Field select label="Tipo de tuberculosis" name="tipoTuberculosis" value={form.tipoTuberculosis} onChange={onChange}>
            <MenuItem value="Pulmonar">Pulmonar</MenuItem>
            <MenuItem value="Extra Pulmonar">Extra Pulmonar</MenuItem>
            <MenuItem value="Meningeal">Meningeal</MenuItem>
        </Field>

        <Field select label="Condición de ingreso" name="condicionIngreso" value={form.condicionIngreso} onChange={onChange}>
            <MenuItem value="Nuevo">Nuevo</MenuItem>
            <MenuItem value="Recaida">Recaida</MenuItem>
            <MenuItem value="Fracaso">Fracaso</MenuItem>
            <MenuItem value="RecuperadoTrasPerdida">Recuperado tras perdida</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
        </Field>

        <Field select label="Condición de ingreso" name="condicionIngreso" value={form.condicionIngreso} onChange={onChange}>
            <MenuItem value="Nuevo">Nuevo</MenuItem>
            <MenuItem value="Recaida">Recaida</MenuItem>
            <MenuItem value="Fracaso">Fracaso</MenuItem>
            <MenuItem value="RecuperadoTrasPerdida">Recuperado tras perdida</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
        </Field>
    </Stack>
);