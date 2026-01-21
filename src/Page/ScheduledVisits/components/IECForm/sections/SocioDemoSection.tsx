import { Stack, Typography, MenuItem } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
}


export const SocioDemoSection = ({ form, onChange }: Props) => (
    <Stack spacing={2} p={2}>
        <Typography fontSize={14} fontWeight={600}>Datos sociodemográficos</Typography>


        <Field label="Ocupación" name="ocupacion" value={form.ocupacion} onChange={onChange} />


        <Field select label="Etnia" name="etnia" value={form.etnia} onChange={onChange}>
            <MenuItem value="Indígena">Indígena</MenuItem>
            <MenuItem value="Afrocolombiano">Afrocolombiano</MenuItem>
            <MenuItem value="Raizal">Raizal</MenuItem>
            <MenuItem value="Rrom Gitano">Rrom Gitano</MenuItem>
            <MenuItem value="N/A">N/A</MenuItem>
        </Field>

        <Field select label="Escolaridad" name="escolaridad" value={form.escolaridad} onChange={onChange}>
            <MenuItem value="Sin escolaridad">Ninguna</MenuItem>
            <MenuItem value="Primaria">Primaria</MenuItem>
            <MenuItem value="Bachillerato">Bachillerato</MenuItem>
            <MenuItem value="Tecnico">Técnico</MenuItem>
            <MenuItem value="Tecnologo">Técnologo</MenuItem>
            <MenuItem value="Profesional">Profesional</MenuItem>
            <MenuItem value="Posgrado">Posgrado</MenuItem>
        </Field>

        <Field select label="Estado civil" name="estadoCivil" value={form.estadoCivil} onChange={onChange}>
            <MenuItem value="Soltero">Soltero(a)</MenuItem>
            <MenuItem value="Casado">Casado(a)</MenuItem>
            <MenuItem value="Union libre">Union libre</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
        </Field>
    </Stack>
);