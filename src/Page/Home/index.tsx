import {
  Box,
  Card,
  Typography,
  Chip,
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../hook/useAuth";
import { Navbar } from "../../shared";

export const Home = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    {
      id: "001",
      condicion: "Activo",
      tipoId: "CC",
      numeroId: "123456789",
      nombre: "Juan Pérez Gómez",
      fechaNotificacion: "2024-01-15",
      semanas: 12,
      edad: 34,
      sexo: "Masculino",
      barrio: "San José",
    },
    {
      id: "002",
      condicion: "Seguimiento",
      tipoId: "TI",
      numeroId: "987654321",
      nombre: "María Rodríguez",
      fechaNotificacion: "2024-02-01",
      semanas: 8,
      edad: 28,
      sexo: "Femenino",
      barrio: "La Esperanza",
    },
  ];

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
    <Box>
      <Navbar />
      <Box bgcolor="#f2f4f8" minHeight="100vh" p={2}>
        {isMobile ? (
          // 📱 MOBILE: lista
          <Stack spacing={2}>
            {data.map((item) => (
              <Card
                key={item.id}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      ID {item.id}
                    </Typography>
                    <Chip
                      label={item.condicion}
                      color={getConditionColor(item.condicion)}
                      size="small"
                    />
                  </Stack>

                  <Typography fontWeight={600}>{item.nombre}</Typography>

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

                  <Typography variant="caption">📍 {item.barrio}</Typography>
                </Stack>
              </Card>
            ))}
          </Stack>
        ) : (
          // 💻 DESKTOP: cards
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: "100%",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        ID {item.id}
                      </Typography>
                      <Chip
                        label={item.condicion}
                        color={getConditionColor(item.condicion)}
                        size="small"
                      />
                    </Stack>

                    <Typography fontWeight={600}>{item.nombre}</Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.tipoId} {item.numeroId}
                    </Typography>

                    <Typography variant="body2">
                      📅 {item.fechaNotificacion}
                    </Typography>

                    <Typography variant="body2">
                      Semanas: {item.semanas}
                    </Typography>

                    <Typography variant="body2">Edad: {item.edad}</Typography>

                    <Typography variant="body2">Sexo: {item.sexo}</Typography>

                    <Typography variant="body2">
                      Barrio: {item.barrio}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
