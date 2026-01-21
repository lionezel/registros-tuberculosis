import { Stack, Typography, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
    handleCheckboxChange: (name: string, value: string) => void;
}


export const DwellingSection = ({ form, onChange, handleCheckboxChange }: Props) => (
    <Stack spacing={2} p={2}>
        <Typography fontSize={14} fontWeight={600}>Vivienda</Typography>

        <Field select label="Cuantas Personas Viven Con Usted" name="cuantasPersonasVivenConUsted" value={form.cuantasPersonasVivenConUsted} onChange={onChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2-3">2-3</MenuItem>
            <MenuItem value="4-6">4-6</MenuItem>
            <MenuItem value="+6">+6</MenuItem>
        </Field>

        <Field select label="Calidad de la vivienda" name="calidadVivienda" value={form.calidadVivienda} onChange={onChange}>
            <MenuItem value="HayHacinamiento">Hay hacinamiento</MenuItem>
            <MenuItem value="Falta ventilacion">Falta ventilacion</MenuItem>
            <MenuItem value="Mala iluminacion">Mala iluminacion</MenuItem>
            <MenuItem value="Ninguna">Ninguna</MenuItem>
        </Field>

        <Field select label="Cuantas personas dependen de usted" name="personasDependen" value={form.personasDependen} onChange={onChange}>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2-3">2-3</MenuItem>
            <MenuItem value="4-6">4-6</MenuItem>
            <MenuItem value="+6">+6</MenuItem>
        </Field>

        <Typography fontSize={13} fontWeight={500}>
            La vivienda cuenta con servicios
        </Typography>

        {[
            "Luz",
            "Agua",
            "Alcantarillado",
            "Gas",
            "Internet",
            "Televisión",
            "Telefono",
            "Recolecion de basura",
        ].map((option) => (
            <FormControlLabel
                key={option}
                control={
                    <Checkbox
                        checked={form.serviciosVivienda?.includes(option)}
                        onChange={() =>
                            handleCheckboxChange("serviciosVivienda", option)
                        }
                    />
                }
                label={option}
            />
        ))}

        <Field select label="Sus ingresos economicos mensuales" name="ingresosMensuales" value={form.ingresosMensuales} onChange={onChange}>
            <MenuItem value="NoTiene">No tiene</MenuItem>
            <MenuItem value="MenosDe1SMLV">Menos de 1 SMLV</MenuItem>
            <MenuItem value="2-3SMLV">2-3 SMLV</MenuItem>
            <MenuItem value="MasDe4SMLV">Mas de 4 SMLV</MenuItem>
        </Field>

        <Field select label="Cuantas comidas consume al dia" name="comidasDia" value={form.comidasDia} onChange={onChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="+3">+3</MenuItem>
        </Field>

        <Field select label="Recibe subsidio" name="recibeSubsidio" value={form.recibeSubsidio} onChange={onChange}>
            <MenuItem value="Si">Si</MenuItem>
            <MenuItem value="No">No</MenuItem>
        </Field>

    </Stack>
);