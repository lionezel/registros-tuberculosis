import {
  Drawer,
  IconButton,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { AppUser, useFetchUsers } from "../../../../hook/useFetchUsers";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete?: () => void;
  onOpenIEC: () => void;
  initialData?: any;
  isEdit?: boolean;   // true = editar, false = solo ver
  hasIEC?: boolean;
}

export const VisitModal = ({
  open,
  onClose,
  onSave,
  onDelete,
  onOpenIEC,
  initialData,
  isEdit = false,
  hasIEC = false,
}: Props) => {
  const { users } = useFetchUsers();

  // 🔒 Modo solo lectura si NO es edición
  const isReadOnly = !isEdit;

  // Datos básicos
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Datos clínicos
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Usuario asignado
  const [assignedUser, setAssignedUser] = useState<AppUser | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStart(initialData.start?.slice(0, 16) || "");
      setEnd(initialData.end?.slice(0, 16) || "");

      setPatientName(initialData.patientName || "");
      setAddress(initialData.address || "");
      setPhone(initialData.phone || "");
      setAssignedUser(initialData.assignedUser || null);
    }
  }, [initialData]);

  const handleSave = () => {
    if (isReadOnly) return;

    onSave({
      title,
      description,
      start,
      end,

      patientName,
      address,
      phone,

      assignedUser,
      assignedUserId: assignedUser?.uid || null,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 550,
          borderLeft: "1px solid #ddd",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#1976d2",
          color: "white",
        }}
      >
        <Typography fontWeight={600}>
          {isEdit ? "Editar cita" : "Detalle de la cita"}
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* BOTÓN IEC SOLO SI ES EDICIÓN */}
      {isEdit && (
        <Stack direction="row" spacing={2} p={2}>
          <Button
            size="small"
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ bgcolor: "#1976d2" }}
            onClick={onOpenIEC}
          >
            {hasIEC ? "Editar formato IEC" : "Llenar formato IEC"}
          </Button>
        </Stack>
      )}

      <Divider />

      {/* FORMULARIO */}
      <Box sx={{ p: 2, overflowY: "auto", height: "100%" }}>
        <Stack spacing={2}>

          {/* DATOS DEL PACIENTE */}
          <Typography fontWeight={600}>🧑 Paciente</Typography>

          <TextField
            size="small"
            label="Nombre del paciente"
            fullWidth
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <TextField
            size="small"
            label="Dirección"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <TextField
            size="small"
            label="Número de contacto"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <Divider />

          {/* ASIGNACIÓN */}
          <Typography fontWeight={600}>👨‍⚕️ Asignado a</Typography>

          <Autocomplete
            options={users}
            getOptionLabel={(option) =>
              `${option.displayName} (${option.email})`
            }
            value={assignedUser}
            onChange={(_, value) => setAssignedUser(value)}
            disabled={isReadOnly}   // 🔒 bloqueado en solo lectura
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Seleccionar usuario"
                placeholder="Buscar por nombre o correo"
              />
            )}
          />

          {assignedUser && (
            <Typography fontSize={13} color="gray">
              Tel: {assignedUser.phone || "No registrado"}
            </Typography>
          )}

          <Divider />

          {/* DATOS DE LA CITA */}
          <Typography fontWeight={600}>📅 Datos de la cita</Typography>

          <TextField
            size="small"
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <TextField
            size="small"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <TextField
            size="small"
            label="Hora inicio"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <TextField
            size="small"
            label="Hora fin"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            InputProps={{
              readOnly: isReadOnly,
            }}
          />

          <Divider />

          {/* ACCIONES */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Eliminar solo si puede editar */}
            {isEdit && (
              <IconButton color="error" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            )}

            <Stack direction="row" spacing={1}>
              <Button onClick={onClose}>Cerrar</Button>

              {/* Guardar solo si puede editar */}
              {isEdit && (
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={!patientName || !start || !end}
                >
                  Guardar cita
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};
