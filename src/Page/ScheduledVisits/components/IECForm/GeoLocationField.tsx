import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface Props {
    value: string; // "lat, lng"
    onChange: (value: string) => void;
}

const defaultPosition: [number, number] = [6.2442, -75.5812]; // Medellín

// Componente para mover el mapa desde fuera
const RecenterMap = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 15);
    }, [position, map]);
    return null;
};

export const GeoLocationField = ({ value, onChange }: Props) => {
    const [position, setPosition] = useState<[number, number]>(defaultPosition);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [errorLocation, setErrorLocation] = useState<string | null>(null);

    // Cargar valor existente si viene del form
    useEffect(() => {
        if (value) {
            const [lat, lng] = value.split(",").map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
                setPosition([lat, lng]);
            }
        }
    }, [value]);

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setErrorLocation("Este navegador no soporta geolocalización");
            return;
        }

        setLoadingLocation(true);
        setErrorLocation(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                const newPos: [number, number] = [lat, lng];
                setPosition(newPos);
                onChange(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
                setLoadingLocation(false);
            },
            (err) => {
                if (err.code === 1) {
                    setErrorLocation("Permiso de ubicación denegado");
                } else {
                    setErrorLocation("No se pudo obtener la ubicación");
                }
                setLoadingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    };

    return (
        <Box>
            <Typography fontSize={14} fontWeight={600} mb={1}>
                Georreferenciación de visita *
            </Typography>

            <Stack direction="row" spacing={1} mb={1}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="0.000000, 0.000000"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

                <Button
                    variant="outlined"
                    onClick={handleUseMyLocation}
                    disabled={loadingLocation}
                >
                    {loadingLocation ? "Ubicando..." : "Usar mi ubicación"}
                </Button>
            </Stack>

            {errorLocation && (
                <Typography color="error" variant="caption" mb={1}>
                    {errorLocation}
                </Typography>
            )}

            <Box
                sx={{
                    height: 260,
                    border: "1px solid #1976d2",
                    borderRadius: 1,
                    overflow: "hidden",
                }}
            >
                <MapContainer
                    center={position}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                >
                    <RecenterMap position={position} />

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker
                        position={position}
                        draggable
                        eventHandlers={{
                            dragend: (e) => {
                                const marker = e.target;
                                const lat = marker.getLatLng().lat;
                                const lng = marker.getLatLng().lng;

                                setPosition([lat, lng]);
                                onChange(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
                            },
                        }}
                    />
                </MapContainer>
            </Box>
        </Box>
    );
};
