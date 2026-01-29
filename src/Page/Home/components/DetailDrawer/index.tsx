import {
    Box,
    Divider,
    Drawer,
    Stack,
    Typography,
    Chip,
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const DetailDrawer = ({
    openDrawer,
    handleCloseDrawer,
    selectedEvent,
    isMobile,
}: any) => {
    let lat: number | null = null;
    let lng: number | null = null;

    if (selectedEvent?.georreferenciacion) {
        const parts = selectedEvent.georreferenciacion.split(",");
        if (parts.length === 2) {
            lat = Number(parts[0].trim());
            lng = Number(parts[1].trim());
        }
    }

    // ---------- Componentes reutilizables ----------

    const Section = ({ title, children }: any) => {
        // En móvil: Accordion animado
        if (isMobile) {
            return (
                <Accordion
                    defaultExpanded={false}
                    disableGutters
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        "&:before": { display: "none" },
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={600} color="primary">
                            {title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={0.8}>{children}</Stack>
                    </AccordionDetails>
                </Accordion>
            );
        }

        // En desktop: siempre expandido
        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    mb={1}
                    color="primary"
                >
                    {title}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Stack spacing={0.8}>{children}</Stack>
            </Paper>
        );
    };

    const Item = ({ label, value }: any) => (
        <Grid container spacing={1}>
            <Grid>
                <Typography
                    variant={isMobile ? "caption" : "body2"}
                    color="text.secondary"
                >
                    {label}
                </Typography>
            </Grid>
            <Grid>
                <Typography
                    variant="body2"
                    fontWeight={500}
                >
                    {value || "—"}
                </Typography>
            </Grid>
        </Grid>
    );

    // ---------- Render ----------

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={handleCloseDrawer}
            PaperProps={{
                sx: {
                    width: isMobile ? "80%" : 440,
                    p: isMobile ? 1.5 : 2,
                    bgcolor: "#fafafa",
                },
            }}
        >
            {selectedEvent && (
                <Stack spacing={2}>
                    {/* Header fijo */}
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            bgcolor: "background.paper",
                            pb: 1,
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={700}>
                            Información del Paciente
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Detalle completo del registro
                        </Typography>
                    </Box>

                    {/* Datos personales */}
                    <Section title="Datos personales">
                        <Item label="Paciente" value={selectedEvent.paciente} />
                        <Item
                            label="Documento"
                            value={`${selectedEvent.tipoId} ${selectedEvent.numeroId}`}
                        />
                        <Item label="Edad" value={selectedEvent.edad} />
                        <Item label="Sexo" value={selectedEvent.sexo} />
                        <Item label="Estado civil" value={selectedEvent.estadoCivil} />
                        <Item label="Etnia" value={selectedEvent.etnia} />
                        <Item label="Escolaridad" value={selectedEvent.escolaridad} />
                        <Item label="Ocupación" value={selectedEvent.ocupacion} />
                    </Section>

                    {/* Ubicación y zona */}
                    <Section title="Ubicación y zona">
                        <Item label="Área geográfica" value={selectedEvent.areaGeografica} />

                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip
                                label="Urbana"
                                color={selectedEvent.ZonaUrbana ? "primary" : "default"}
                                size="small"
                            />
                            <Chip
                                label="Rural"
                                color={selectedEvent.ZonaRural ? "primary" : "default"}
                                size="small"
                            />
                            <Chip
                                label="Rural dispersa"
                                color={selectedEvent.ZonaRuralDispersa ? "primary" : "default"}
                                size="small"
                            />
                        </Stack>

                        <Item label="Departamento" value={selectedEvent.departamento} />
                        <Item
                            label="Municipio"
                            value={selectedEvent.municipioResidencia}
                        />
                        <Item label="Dirección" value={selectedEvent.direccion} />
                    </Section>

                    {/* Vivienda */}
                    <Section title="Condiciones de vivienda">
                        <Item label="Tipo de vivienda" value={selectedEvent.tipoVivienda} />
                        <Item
                            label="Calidad vivienda"
                            value={selectedEvent.calidadVivienda}
                        />
                        <Item
                            label="Personas viven"
                            value={selectedEvent.cuantasPersonasVivenConUsted}
                        />
                        <Item
                            label="Personas dependen"
                            value={selectedEvent.personasDependen}
                        />

                        <Box>
                            <Typography
                                variant={isMobile ? "caption" : "body2"}
                                color="text.secondary"
                                mb={0.5}
                            >
                                Servicios
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {selectedEvent.serviciosVivienda?.map(
                                    (s: string, i: number) => (
                                        <Chip key={i} label={s} size="small" />
                                    )
                                )}
                            </Stack>
                        </Box>
                    </Section>

                    {/* Información clínica */}
                    <Section title="Información clínica">
                        <Item label="Tipo de caso" value={selectedEvent.tipoCaso} />
                        <Item label="Tipo TB" value={selectedEvent.tipoTuberculosis} />
                        <Item
                            label="Prueba molecular"
                            value={selectedEvent.pruebaMolecular}
                        />
                        <Item label="Resistente" value={selectedEvent.resistente} />
                    </Section>

                    {/* Firmas */}
                    {(selectedEvent.firmaPaciente ||
                        selectedEvent.firmaPersonalApoyo) && (
                            <Section title="Firmas">
                                {selectedEvent.firmaPaciente && (
                                    <Box>
                                        <Typography variant="caption">Firma paciente</Typography>
                                        <Box
                                            component="img"
                                            src={selectedEvent.firmaPaciente}
                                            sx={{
                                                width: "100%",
                                                maxHeight: 120,
                                                objectFit: "contain",
                                                border: "1px solid #eee",
                                                borderRadius: 1,
                                            }}
                                        />
                                    </Box>
                                )}

                                {selectedEvent.firmaPersonalApoyo && (
                                    <Box>
                                        <Typography variant="caption">
                                            Firma personal apoyo
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={selectedEvent.firmaPersonalApoyo}
                                            sx={{
                                                width: "100%",
                                                maxHeight: 120,
                                                objectFit: "contain",
                                                border: "1px solid #eee",
                                                borderRadius: 1,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Section>
                        )}

                    {/* Mapa */}
                    {lat && lng && (
                        <Section title="Ubicación de la visita">
                            <Box
                                sx={{
                                    height: 220,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <MapContainer
                                    center={[lat, lng]}
                                    zoom={16}
                                    style={{ height: "100%", width: "100%" }}
                                    scrollWheelZoom={false}
                                    dragging={false}
                                    doubleClickZoom={false}
                                    zoomControl={false}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[lat, lng]} />
                                </MapContainer>
                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                {lat.toFixed(6)}, {lng.toFixed(6)}
                            </Typography>
                        </Section>
                    )}

                    {/* Foto evidencia */}
                    {selectedEvent.fotoEvidencia && (
                        <Section title="Foto de evidencia">
                            <Box
                                component="img"
                                src={selectedEvent.fotoEvidencia}
                                sx={{
                                    width: "100%",
                                    maxHeight: 260,
                                    objectFit: "contain",
                                    border: "1px solid #eee",
                                    borderRadius: 2,
                                }}
                            />
                        </Section>
                    )}
                </Stack>
            )}
        </Drawer>
    );
};
