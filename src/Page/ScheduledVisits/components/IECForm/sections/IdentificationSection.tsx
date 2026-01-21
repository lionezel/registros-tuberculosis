import { Stack, Button, MenuItem } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
    onOCR: (file: File) => void;
    loadingOCR: boolean;
}


export const IdentificationSection = ({ form, onChange, onOCR, loadingOCR }: Props) => (
    <Stack spacing={2} p={2}>
        <Field select label="Tipo de identificación" name="tipoId" value={form.tipoId} onChange={onChange}>
            <MenuItem value="CC">Cédula</MenuItem>
            <MenuItem value="TI">Tarjeta de identidad</MenuItem>
            <MenuItem value="CE">Cédula extranjera</MenuItem>
            <MenuItem value="PA">Pasaporte</MenuItem>
        </Field>


        <Field label="Número de identificación" name="numeroId" value={form.numeroId} onChange={onChange} />


        <Button variant="outlined" component="label" fullWidth disabled={loadingOCR}>
            {loadingOCR ? "Leyendo cédula..." : "📸 Tomar / subir foto de la cédula"}
            <input
                hidden
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e: any) => e.target.files[0] && onOCR(e.target.files[0])}
            />
        </Button>


        <Field select label="Sexo" name="sexo" value={form.sexo} onChange={onChange}>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
            <MenuItem value="O">Otro</MenuItem>
        </Field>


        <Field label="Edad" name="edad" type="number" value={form.edad} onChange={onChange} />
    </Stack>
);