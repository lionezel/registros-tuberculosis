import { useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../../../../firebase/cofing";
import { VisitModal } from ".";
import { IECFormDrawer } from "../IECForm/IECFormDrawer";




export const VisitsManager = () => {
    const [openVisitModal, setOpenVisitModal] = useState(false);
    const [openIEC, setOpenIEC] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    const [hasIEC, setHasIEC] = useState(false);
    const [iecDocId, setIecDocId] = useState<string | null>(null);

    // 🔎 Verifica si ya existe IEC para esta cita
    const checkIfHasIEC = async (appointmentId: string) => {
        const q = query(
            collection(db, "events-tub"),
            where("appointmentId", "==", appointmentId)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
            setHasIEC(true);
            setIecDocId(snap.docs[0].id);
        } else {
            setHasIEC(false);
            setIecDocId(null);
        }
    };

    // ✏️ Abrir edición de cita
    const handleOpenEditVisit = async (appointment: any) => {
        setSelectedAppointment(appointment);
        await checkIfHasIEC(appointment.id);
        setOpenVisitModal(true);
    };

    return (
        <>
            {/* EJEMPLO: aquí tú abres una cita */}
            <button
                onClick={() =>
                    handleOpenEditVisit({
                        id: "ABC123",
                        extendedProps: {
                            patientName: "Juan",
                            address: "Calle 1",
                            phone: "3000000",
                        },
                    })
                }
            >
                Abrir cita ejemplo
            </button>

            {/* MODAL DE CITA */}
            <VisitModal
                open={openVisitModal}
                onClose={() => setOpenVisitModal(false)}
                onSave={(data) => console.log("Guardar cita", data)}
                onDelete={() => console.log("Eliminar cita")}
                onOpenIEC={() => setOpenIEC(true)}
                initialData={selectedAppointment}
                isEdit={true}
                hasIEC={hasIEC}          // 👈 CLAVE
            />

            {/* FORMULARIO IEC */}
            <IECFormDrawer
                open={openIEC}
                onClose={() => setOpenIEC(false)}
                appointment={selectedAppointment}
                iecDocId={iecDocId}     // 👈 CLAVE
            />
        </>
    );
};
