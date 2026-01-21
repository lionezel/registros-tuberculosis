import {
    Stack,
    Button,
    Divider,
    Drawer,
    Box,
    Typography,
    IconButton,
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/cofing";
import { DwellingSection } from "./sections/DwellingSection";
import { IncomeProgramSection } from "./sections/IncomeProgramSection";


interface Props {
    open: boolean;
    onClose: () => void;
    appointment: any;
}


export const IECFormDrawer = ({ open, onClose, appointment }: Props) => {
    const [form, setForm] = useState<IECForm>(initialForm);
    const [loadingOCR, setLoadingOCR] = useState(false);


    useEffect(() => {
        if (appointment) {
            setForm(prev => ({
                ...prev,
                paciente: appointment?.extendedProps?.patientName || "",
                direccion: appointment?.extendedProps?.address || "",
                telefono: appointment?.extendedProps?.phone || "",
            }));
        }
    }, [appointment]);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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



    const handleCedulaPhoto = async (file: File) => {
        setLoadingOCR(true);


        try {
            const { data } = await Tesseract.recognize(file, "spa");
            const text = data.text.toUpperCase();


            setForm(prev => ({
                ...prev,
                numeroId: extractNumeroId(text),
                sexo: extractSexo(text),
                edad: extractEdad(text),
            }));
        } finally {
            setLoadingOCR(false);
        }
    };


    const handleSave = async () => {
        try {
            const payload = {
                ...form,
                appointmentId: appointment?.id || null,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "events-tub"), payload);

            console.log("✅ IEC guardado en Firebase");
            onClose();
        } catch (error) {
            console.error("❌ Error guardando IEC:", error);
        }
    };


    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", bgcolor: "#1976d2", color: "white" }}>
                <Typography fontWeight={600}>📄 Formato IEC</Typography>
                <IconButton onClick={onClose} sx={{ color: "white" }}><CloseIcon /></IconButton>
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
            <DwellingSection form={form} onChange={handleChange} handleCheckboxChange={handleCheckboxChange} />

            <Divider />
            <IncomeProgramSection form={form} onChange={handleChange} />

            <Divider />


            <Stack direction="row" justifyContent="flex-end" spacing={1} p={2}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>Guardar IEC</Button>
            </Stack>
        </Drawer>
    );
};