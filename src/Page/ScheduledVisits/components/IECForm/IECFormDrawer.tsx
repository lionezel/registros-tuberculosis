import {
    Stack,
    Button,
    Divider,
    Drawer,
    Box,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

import { IECForm, initialForm } from "./types";
import { extractNumeroId, extractSexo, extractEdad } from "./ocr";
import { PatientSection } from "./sections/PatientSection";
import { IdentificationSection } from "./sections/IdentificationSection";
import { SocioDemoSection } from "./sections/SocioDemoSection";
import { UbicationSection } from "./sections/UbicationSection";
import { DwellingSection } from "./sections/DwellingSection";
import { IncomeProgramSection } from "./sections/IncomeProgramSection";

import {
    collection,
    serverTimestamp,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../firebase/cofing";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

interface Props {
    open: boolean;
    onClose: () => void;
    appointment: any;
    iecDocId?: string | null; // normalmente será appointment.id
}

export const IECFormDrawer = ({ open, onClose, appointment, iecDocId }: Props) => {
    const [form, setForm] = useState<IECForm>(initialForm);
    const [loadingOCR, setLoadingOCR] = useState(false);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [evidencePreview, setEvidencePreview] = useState<string | null>(null);

    const auth = getAuth();
    const user = auth.currentUser;

    // ============================
    // 🔹 Precargar datos de la cita
    // ============================
    useEffect(() => {
        if (appointment) {
            setForm((prev) => ({
                ...prev,
                paciente: appointment?.extendedProps?.patientName || "",
                direccion: appointment?.extendedProps?.address || "",
                telefono: appointment?.extendedProps?.phone || "",
            }));
        }
    }, [appointment]);

    // ============================
    // 🔹 Cargar IEC existente para edición
    // ============================
    useEffect(() => {
        const loadExistingIEC = async () => {
            const docId = iecDocId || appointment?.id;
            if (!docId) return;

            const refDoc = doc(db, "events-tub", docId);
            const snap = await getDoc(refDoc);

            if (snap.exists()) {
                setForm(snap.data() as IECForm);
                console.log("📄 IEC cargado para edición:", docId);
            } else {
                console.log("🆕 No existe IEC, se creará uno nuevo:", docId);
            }
        };

        if (open && appointment?.id) {
            loadExistingIEC();
        }
    }, [open, iecDocId, appointment]);

    // ============================
    // 🔹 Handlers de formulario
    // ============================
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, value: string) => {
        setForm((prev: any) => {
            const current: string[] = prev[name] || [];
            const exists = current.includes(value);

            return {
                ...prev,
                [name]: exists
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });
    };

    // ============================
    // 🔹 OCR de cédula
    // ============================
    const handleCedulaPhoto = async (file: File) => {
        setLoadingOCR(true);

        try {
            const { data } = await Tesseract.recognize(file, "spa");
            const text = data.text.toUpperCase();

            setForm((prev) => ({
                ...prev,
                numeroId: extractNumeroId(text),
                sexo: extractSexo(text),
                edad: extractEdad(text),
            }));
        } finally {
            setLoadingOCR(false);
        }
    };

    // ============================
    // 🔹 GUARDAR IEC (ID FIJO)
    // ============================
    const handleSave = async () => {
        try {
            if (!user) throw new Error("Usuario no autenticado");
            if (!appointment?.id) throw new Error("La cita no tiene ID");

            const iecId = iecDocId || appointment.id; // 👈 ID FIJO

            let firmaUrl: string | null = null;
            let fotoEvidenciaUrl: string | null = null;

            const firma = form.firmaPersonalApoyo;

            // ===== FIRMA =====
            if (firma && firma.startsWith("data:image")) {
                const fileRef = ref(storage, `firmas/${user.uid}.png`);
                await uploadString(fileRef, firma, "data_url");
                firmaUrl = await getDownloadURL(fileRef);
            } else if (firma && firma.startsWith("http")) {
                firmaUrl = firma;
            } else {
                throw new Error("La firma es obligatoria");
            }

            // ===== FOTO =====
            if (evidenceFile) {
                const fileRef = ref(
                    storage,
                    `evidencias/${user.uid}/${Date.now()}.jpg`
                );
                await uploadBytes(fileRef, evidenceFile);
                fotoEvidenciaUrl = await getDownloadURL(fileRef);
            } else {
                fotoEvidenciaUrl = form.fotoEvidencia || null;
            }

            if (!fotoEvidenciaUrl) {
                throw new Error("Debe adjuntar foto de evidencia");
            }

            const payload = {
                ...form,
                firmaPaciente: firmaUrl,
                fotoEvidencia: fotoEvidenciaUrl,
                appointmentId: appointment.id,
                userId: user.uid,
                updatedAt: serverTimestamp(),
            };

            const refDoc = doc(db, "events-tub", iecId);

            // 🔑 CREA O ACTUALIZA CON EL MISMO ID
            await setDoc(
                refDoc,
                {
                    ...payload,
                    createdAt: serverTimestamp(),
                },
                { merge: true }
            );

            console.log("✅ IEC guardado correctamente con ID:", iecId);

            onClose();
        } catch (error) {
            console.error("❌ Error guardando IEC:", error);
            alert((error as Error).message);
        }
    };

    // ============================
    // 🔹 UI
    // ============================
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    bgcolor: "#1976d2",
                    color: "white",
                }}
            >
                <Typography fontWeight={600}>📄 Formato IEC</Typography>
                <IconButton onClick={onClose} sx={{ color: "white" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <PatientSection form={form} onChange={handleChange} />
            <Divider />

            <IdentificationSection
                form={form}
                onChange={handleChange}
                onOCR={handleCedulaPhoto}
                loadingOCR={loadingOCR}
            />
            <Divider />

            <SocioDemoSection form={form} onChange={handleChange} />
            <Divider />

            <UbicationSection form={form} onChange={handleChange} />
            <Divider />

            <DwellingSection
                form={form}
                onChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />

            <IncomeProgramSection form={form} onChange={handleChange} />
            <Divider />

            {/* ================= FOTO EVIDENCIA ================= */}
            <Box p={2}>
                <Typography fontWeight={600} mb={1}>
                    📸 Foto de evidencia <span style={{ color: "#d32f2f" }}>*</span>
                </Typography>

                <input
                    id="evidence-photo-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setEvidenceFile(file);
                        setEvidencePreview(URL.createObjectURL(file));
                    }}
                />

                <label htmlFor="evidence-photo-input">
                    <Button
                        variant="outlined"
                        component="span"
                        fullWidth
                        sx={{
                            justifyContent: "flex-start",
                            borderStyle: "dashed",
                            py: 1.5,
                        }}
                    >
                        Seleccionar / Tomar foto
                    </Button>
                </label>

                {evidencePreview && (
                    <Paper
                        elevation={1}
                        sx={{
                            mt: 2,
                            p: 1,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Vista previa
                        </Typography>

                        <Box
                            component="img"
                            src={evidencePreview}
                            sx={{
                                mt: 1,
                                width: "100%",
                                maxHeight: 220,
                                objectFit: "contain",
                                borderRadius: 1,
                                border: "1px solid #eee",
                            }}
                        />
                    </Paper>
                )}
            </Box>

            <Divider />

            <Stack direction="row" justifyContent="flex-end" spacing={1} p={2}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                    Guardar IEC
                </Button>
            </Stack>
        </Drawer>
    );
};
