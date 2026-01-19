import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Stack,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useEffect, useState } from "react";
  
  interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: {
      title: string;
      description: string;
      start: string;
      end: string;
    }) => void;
    onDelete?: () => void;
    initialData?: {
      title: string;
      description: string;
      start: string;
      end: string;
    };
    isEdit?: boolean;
  }
  
  export const VisitModal = ({
    open,
    onClose,
    onSave,
    onDelete,
    initialData,
    isEdit = false,
  }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
  
    useEffect(() => {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setStart(initialData.start.slice(0, 16));
        setEnd(initialData.end.slice(0, 16));
      }
    }, [initialData]);
  
    const handleSave = () => {
      onSave({
        title,
        description,
        start,
        end,
      });
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {isEdit ? "Editar reunión" : "Nueva reunión"}
  
          {isEdit && (
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </DialogTitle>
  
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
  
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
  
            <TextField
              label="Hora inicio"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
  
            <TextField
              label="Hora fin"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Stack>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!title || !start || !end}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  