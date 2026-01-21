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
import {
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { db } from "../../firebase/cofing";
import { VisitModal } from "./components";
import { IECFormDrawer } from "./components/IECForm/IECFormDrawer";

export const ScheduledVisits = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [iecOpen, setIecOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  /* 🔥 RESPONSIVE */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /* 🔥 Firestore realtime */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "scheduledVisits"), (snap) => {
      const data = snap.docs.map((d) => {
        const ev = d.data();

        return {
          id: d.id,
          title: ev.title,
          start: ev.start,
          end: ev.end,

          /* 🔵 COLOR AZUL */
          backgroundColor: "#1976d2",
          borderColor: "#1565c0",
          textColor: "#ffffff",

          /* 🔥 PROPS EXTENDIDAS */
          extendedProps: {
            description: ev.description,
            patientName: ev.patientName,
            address: ev.address,
            phone: ev.phone,

            assignedUserId: ev.assignedUserId,
            assignedUserName: ev.assignedUserName,
            assignedUserEmail: ev.assignedUserEmail,
          },
        };
      });

      setEvents(data);
    });

    return () => unsub();
  }, []);

  /* ➕ Crear */
  const handleCreate = async (data: any) => {
    await addDoc(collection(db, "scheduledVisits"), {
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,

      patientName: data.patientName,
      address: data.address,
      phone: data.phone,

      assignedUserId: data.assignedUserId,
      assignedUserName: data.assignedUser?.displayName || null,
      assignedUserEmail: data.assignedUser?.email || null,

      createdAt: new Date(),
    });

    setSnackbar({ open: true, message: "Cita creada", severity: "success" });
    setModalOpen(false);
  };

  /* ✏️ Editar */
  const handleUpdate = async (data: any) => {
    await updateDoc(doc(db, "scheduledVisits", selectedEvent.id), {
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,

      patientName: data.patientName,
      address: data.address,
      phone: data.phone,

      assignedUserId: data.assignedUserId,
      assignedUserName: data.assignedUser?.displayName || null,
      assignedUserEmail: data.assignedUser?.email || null,
    });

    setSnackbar({
      open: true,
      message: "Cita actualizada",
      severity: "success",
    });
    setModalOpen(false);
  };

  /* 🗑️ Eliminar */
  const handleDelete = async () => {
    await deleteDoc(doc(db, "scheduledVisits", selectedEvent.id));

    setSnackbar({
      open: true,
      message: "Cita eliminada",
      severity: "success",
    });
    setModalOpen(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* CONTENEDOR RESPONSIVE */}
      <Box sx={{ flex: 1, p: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
          height="100%"
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

          /* FORMATOS */
          dayMaxEventRows={isMobile ? 3 : false}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}

          /* HEADER RESPONSIVE */
          headerToolbar={
            isMobile
              ? {
                left: "prev,next",
                center: "title",
                right: "timeGridDay,dayGridMonth",
              }
              : {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }
          }

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
      </Box>

      {/* MODAL CITA */}
      <VisitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={selectedEvent ? handleUpdate : handleCreate}
        onDelete={selectedEvent ? handleDelete : undefined}
        isEdit={!!selectedEvent}
        onOpenIEC={() => setIecOpen(true)}
        initialData={
          selectedEvent
            ? {
              title: selectedEvent.title,
              description:
                selectedEvent.extendedProps?.description || "",
              start: selectedEvent.start?.toISOString(),
              end: selectedEvent.end?.toISOString(),

              patientName:
                selectedEvent.extendedProps?.patientName || "",
              address: selectedEvent.extendedProps?.address || "",
              phone: selectedEvent.extendedProps?.phone || "",

              assignedUser: selectedEvent.extendedProps
                ? {
                  uid: selectedEvent.extendedProps.assignedUserId,
                  displayName:
                    selectedEvent.extendedProps.assignedUserName,
                  email:
                    selectedEvent.extendedProps.assignedUserEmail,
                }
                : null,
            }
            : selectedRange
              ? {
                title: "",
                description: "",
                start: selectedRange.startStr,
                end: selectedRange.endStr,

                patientName: "",
                address: "",
                phone: "",
                assignedUser: null,
              }
              : undefined
        }
      />

      {/* FORM IEC */}
      <IECFormDrawer
        open={iecOpen}
        onClose={() => setIecOpen(false)}
        appointment={selectedEvent}
      />

      {/* NOTIFICACIONES */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
