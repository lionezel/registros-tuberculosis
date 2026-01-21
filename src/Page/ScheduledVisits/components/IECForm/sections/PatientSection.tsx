import { Stack, Typography } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
}


export const PatientSection = ({ form, onChange }: Props) => (
    <Stack spacing={2} p={2}>
        <Typography fontSize={14} fontWeight={600}>Datos del paciente</Typography>
        <Field label="Paciente" name="paciente" value={form.paciente} onChange={onChange} />
        <Field label="Dirección" name="direccion" value={form.direccion} onChange={onChange} />
        <Field label="Teléfono" name="telefono" value={form.telefono} onChange={onChange} />
    </Stack>
);