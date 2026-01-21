import { Stack, Typography, MenuItem } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";


interface Props {
    form: IECForm;
    onChange: (e: any) => void;
}


export const UbicationSection = ({ form, onChange }: Props) => (
    <Stack spacing={2} p={2}>
        <Typography fontSize={14} fontWeight={600}>Ubicación</Typography>


        <Field label="Departamento" name="departamento" value={form.departamento} onChange={onChange} />
        <Field label="municipioProcedencia" name="municipioProcedencia" value={form.municipioProcedencia} onChange={onChange} />
        <Field label="municipioResidencia" name="municipioResidencia" value={form.municipioResidencia} onChange={onChange} />

        <Field select label="Area geográfica" name="areaGeografica" value={form.areaGeografica} onChange={onChange}>
            <MenuItem value="ZonaUrbana">Zona urbana</MenuItem>
            <MenuItem value="ZonaRural">Rural</MenuItem>
            <MenuItem value="ZonaRuralDispersa">Rural dispersa</MenuItem>
        </Field>

        <Field select label="Tipo de vivienda" name="tipoVivienda" value={form.tipoVivienda} onChange={onChange}>
            <MenuItem value="Casa">Casa</MenuItem>
            <MenuItem value="Apartamento">Apartamento</MenuItem>
            <MenuItem value="Albergue">Albergue</MenuItem>
            <MenuItem value="CentroProteccion">Centro de protección</MenuItem>
            <MenuItem value="Ninguna">Ninguna</MenuItem>
        </Field>

        <Field select label="Tipo de trabajo" name="tipoTrabajo" value={form.tipoTrabajo} onChange={onChange}>
            <MenuItem value="Empleado">Empleado</MenuItem>
            <MenuItem value="Independiente">Independiente</MenuItem>
            <MenuItem value="Desempleado">Desempleado</MenuItem>
        </Field>

        <Field label="Nombre de la EAPB" name="nombreEAPB" value={form.nombreEAPB} onChange={onChange} />

        <Field select label="Grupo poblacional" name="grupoPoblacional" value={form.grupoPoblacional} onChange={onChange}>
            <MenuItem value="PrivadoDeLaLibertad">Privado de la libertad</MenuItem>
            <MenuItem value="HabitanteDeCalle">Habitante de calle</MenuItem>
            <MenuItem value="Migrante">Migrante</MenuItem>
            <MenuItem value="TrabajadorDeLaSalud">Trabajador de la salud</MenuItem>
            <MenuItem value="Desplazado">Desplazado</MenuItem>
            <MenuItem value="PersonaConDiscapacidad">Persona con discapacidad</MenuItem>
            <MenuItem value="Desmovilizado">Desmovilizado</MenuItem>
            <MenuItem value="VictimaDelConflicto">Victima del conflicto</MenuItem>
            <MenuItem value="MadresComunitarias">Madres comunitarias</MenuItem>
            <MenuItem value="PoblacionLGBTI">Población LGBTI</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
            <MenuItem value="Ninguno">Ninguno</MenuItem>
        </Field>
    </Stack>
);