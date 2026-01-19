import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


import { Navbar } from "../../shared";

import { Snackbar, Alert } from "@mui/material";
import { db } from "../../firebase/cofing";
import { VisitModal } from "./components";

export const ScheduledVisits = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  /* 🔥 Firestore realtime */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "scheduledVisits"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setEvents(data);
    });

    return () => unsub();
  }, []);

  /* ➕ Crear */
  const handleCreate = async (data: any) => {
    await addDoc(collection(db, "scheduledVisits"), {
      ...data,
      createdAt: new Date(),
    });

    setSnackbar({ open: true, message: "Reunión creada", severity: "success" });
    setModalOpen(false);
  };

  /* ✏️ Editar */
  const handleUpdate = async (data: any) => {
    await updateDoc(doc(db, "scheduledVisits", selectedEvent.id), data);

    setSnackbar({
      open: true,
      message: "Reunión actualizada",
      severity: "success",
    });
    setModalOpen(false);
  };

  /* 🗑️ Eliminar */
  const handleDelete = async () => {
    await deleteDoc(doc(db, "scheduledVisits", selectedEvent.id));

    setSnackbar({
      open: true,
      message: "Reunión eliminada",
      severity: "success",
    });
    setModalOpen(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          height="80vh"
          events={events}
          selectable
          editable
          nowIndicator

          /* MULTI REUNIONES */
          eventOverlap
          eventDisplay="block"
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          slotDuration="00:30:00"

          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}

          select={(info) => {
            setSelectedRange(info);
            setSelectedEvent(null);
            setModalOpen(true);
          }}

          eventClick={(info) => {
            setSelectedEvent(info.event);
            setModalOpen(true);
          }}
        />
      </div>

      <VisitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={selectedEvent ? handleUpdate : handleCreate}
        onDelete={selectedEvent ? handleDelete : undefined}
        isEdit={!!selectedEvent}
        initialData={
          selectedEvent
            ? {
                title: selectedEvent.title,
                description: selectedEvent.extendedProps?.description || "",
                start: selectedEvent.start?.toISOString(),
                end: selectedEvent.end?.toISOString(),
              }
            : selectedRange
            ? {
                title: "",
                description: "",
                start: selectedRange.startStr,
                end: selectedRange.endStr,
              }
            : undefined
        }
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
