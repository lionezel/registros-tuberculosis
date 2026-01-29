import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface Props {
    value: string; // URL ya guardada (si existe)
    onChange: (file: File | null) => void;
}

export const PhotoEvidenceField = ({ value, onChange }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(value || null);

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    return (
        <Box>
            <Typography fontSize={14} fontWeight={600} mb={1}>
                Foto de evidencia *
            </Typography>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment" // 📱 abre cámara en móvil
                hidden
                onChange={handleSelectFile}
            />

            <Button
                variant="outlined"
                onClick={() => inputRef.current?.click()}
                sx={{ mb: 1 }}
            >
                {preview ? "Cambiar foto" : "Tomar / subir foto"}
            </Button>

            {preview && (
                <Box
                    component="img"
                    src={preview}
                    sx={{
                        width: "100%",
                        maxHeight: 220,
                        objectFit: "contain",
                        border: "1px solid #ddd",
                        borderRadius: 1,
                    }}
                />
            )}
        </Box>
    );
};
