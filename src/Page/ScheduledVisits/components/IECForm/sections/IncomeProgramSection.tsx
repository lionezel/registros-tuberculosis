import { Stack, Typography, MenuItem, TextField } from "@mui/material";
import { Field } from "../Field";
import { IECForm } from "../types";
import { SignatureField } from "../SignatureField";
import { GeoLocationField } from "../GeoLocationField";


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

        <Field select label="Cultivo" name="cultivo" value={form.cultivo} onChange={onChange}>
            <MenuItem value="(-)">(-)</MenuItem>
            <MenuItem value="1a9BAAR">1 a 9 BAAR</MenuItem>
            <MenuItem value="+">+</MenuItem>
            <MenuItem value="++">++</MenuItem>
            <MenuItem value="+++">+++</MenuItem>
            <MenuItem value="NR">NR</MenuItem>
            <MenuItem value="Contaminado">Contaminado</MenuItem>
        </Field>

        <Field select label="Prueba molecular" name="pruebaMolecular" value={form.pruebaMolecular} onChange={onChange}>
            <MenuItem value="NoDetectado">No detectado</MenuItem>
            <MenuItem value="Detectado">Detectado</MenuItem>
            <MenuItem value="NoInterpretable">No interpretable</MenuItem>
        </Field>

        <Field select label="Resistente a" name="resistente" value={form.resistente} onChange={onChange}>
            <MenuItem value="Rifampicina">Rifampicina</MenuItem>
            <MenuItem value="Isonlacida">Isonlacida</MenuItem>
            <MenuItem value="Quinolonas">Quinolonas</MenuItem>
            <MenuItem value="Aminoglucosis">Aminoglucosis</MenuItem>
            <MenuItem value="N/A">N/A</MenuItem>
        </Field>

        <Field select label="Tipo de caso" name="tipoCaso" value={form.tipoCaso} onChange={onChange}>
            <MenuItem value="TBSensible">TB sensible</MenuItem>
            <MenuItem value="TBMDR/RR">TBMDR/RR</MenuItem>
            <MenuItem value="TBMonoH">TB mono H</MenuItem>
            <MenuItem value="TBXDR">TBXDR</MenuItem>
        </Field>

        <TextField
            size="small"
            label="Fecha de diagnóstico"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.fechaDiagnostico}
            onChange={(e) => onChange(e)}
            required
        />

        <Field select label="Situación firma paciente o acudiente" name="situacionFirma" value={form.situacionFirma} onChange={onChange}>
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="NoDisponible">No disponible</MenuItem>
        </Field>

        <Field select label="Indique el nombre del personal de apoyo que lo acompaño en la vista" name="nombrePersonalAcompanante" value={form.nombrePersonalAcompanante} onChange={onChange}>
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="NoDisponible">No disponible</MenuItem>
        </Field>

        <Typography fontWeight={600}>Firma del personal de apoyo</Typography>
        <SignatureField
            value={form.firmaPersonalApoyo}
            onChange={(signature) =>
                onChange({
                    target: {
                        name: "firmaPersonalApoyo",
                        value: signature,
                    },
                })
            }
        />
        <Typography fontWeight={600}>Firma del profesional que realiza la visita</Typography>
        <SignatureField
            value={form.firmaPersonalRealiza}
            onChange={(signature) =>
                onChange({
                    target: {
                        name: "firmaPersonalRealiza",
                        value: signature,
                    },
                })
            }
        />

        <GeoLocationField
            value={form.georreferenciacion}
            onChange={(value) =>
                onChange({
                    target: {
                        name: "georreferenciacion",
                        value,
                    },
                })
            }
        />

    </Stack>
);