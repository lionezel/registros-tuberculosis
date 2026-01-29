import { Card, Chip, Stack, Typography } from "@mui/material"

export const CardEventTub = ({ item, handleOpenDrawer }: any) => {
    const getConditionColor = (condicion: string) => {
        switch (condicion) {
            case "Activo":
                return "success";
            case "Seguimiento":
                return "warning";
            case "Crítico":
                return "error";
            case "Finalizado":
                return "info";
            default:
                return "default";
        }
    };
    return (
        <Card
            key={item.id}
            onClick={() => handleOpenDrawer(item)}
            sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                cursor: "pointer",
                "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.15)" },
            }}
        >
            <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                        ID {item.id}
                    </Typography>
                    <Chip
                        label={item.condicionIngreso}
                        color={getConditionColor(item.condicionIngreso)}
                        size="small"
                    />
                </Stack>

                <Typography fontWeight={600}>{item.paciente}</Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.tipoId} {item.numeroId}
                </Typography>

                <Typography variant="body2">
                    📅 {item.fechaNotificacion}
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                        Semanas: {item.semanas}
                    </Typography>
                    <Typography variant="caption">Edad: {item.edad}</Typography>
                    <Typography variant="caption">Sexo: {item.sexo}</Typography>
                </Stack>

                <Typography variant="caption">📍 {item.direccion}</Typography>
            </Stack>
        </Card>
    )
} 