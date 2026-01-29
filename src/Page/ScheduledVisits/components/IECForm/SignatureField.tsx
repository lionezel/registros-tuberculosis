import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";
import { Box, Button, Stack, Typography } from "@mui/material";

interface Props {
    value?: string;            // URL o base64
    onChange: (base64: string | null) => void;
}

export const SignatureField = ({ value, onChange }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const padRef = useRef<SignaturePad | null>(null);

    const isBase64 = value?.startsWith("data:image");
    const isRemoteUrl = value && !isBase64;

    useEffect(() => {
        if (!canvasRef.current) return;

        padRef.current = new SignaturePad(canvasRef.current);

        // Si hay firma en base64 (por ejemplo al volver atrás en el form)
        if (isBase64) {
            const img = new Image();
            img.onload = () => {
                const ctx = canvasRef.current!.getContext("2d")!;
                ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
            img.src = value!;
        }

        padRef.current.onEnd = () => {
            try {
                const data = padRef.current!.toDataURL("image/png");

                if (!data.startsWith("data:image")) {
                    onChange(null);
                    return;
                }

                onChange(data);
            } catch (err) {
                console.error("Error generando firma:", err);
                onChange(null);
            }
        };

        return () => {
            padRef.current?.off();
        };
    }, [value]);

    const handleClear = () => {
        padRef.current?.clear();
        onChange(null);
    };

    const handleReSign = () => {
        padRef.current?.clear();
        onChange(null);
    };

    return (
        <Stack spacing={1}>

            {/* 🖼️ PREVIEW DE FIRMA GUARDADA */}
            {isRemoteUrl && (
                <Box>
                    <Typography fontSize={12} color="text.secondary">
                        Firma guardada:
                    </Typography>
                    <Box
                        component="img"
                        src={value}
                        alt="Firma guardada"
                        sx={{
                            width: "100%",
                            maxHeight: 200,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            objectFit: "contain",
                            mb: 1,
                        }}
                    />

                    <Button variant="outlined" size="small" onClick={handleReSign}>
                        Volver a firmar
                    </Button>
                </Box>
            )}

            {/* ✍️ CANVAS SOLO PARA NUEVA FIRMA */}
            {!isRemoteUrl && (
                <>
                    <Box
                        sx={{
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            width: "100%",
                            height: 200,
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={200}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Box>

                    <Button onClick={handleClear} size="small">
                        Limpiar firma
                    </Button>
                </>
            )}
        </Stack>
    );
};
