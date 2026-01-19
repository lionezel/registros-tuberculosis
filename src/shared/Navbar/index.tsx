import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import WarningIcon from "@mui/icons-material/Warning";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Logo from "../../assets/logo/download.png";
import { auth } from "../../firebase/cofing";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const menuItems = [
    {
      text: "",
      path: "/",
      icon: <FolderIcon />,
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#000",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* IZQUIERDA */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                height: 36,
                display: { xs: "none", md: "block" },
              }}
            />

            <Typography fontWeight={600}>Sistema de Registros</Typography>
          </Box>

          {/* DERECHA */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {user?.email}
            </Typography>

            <Avatar sx={{ width: 36, height: 36 }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <Box width={260} role="presentation">
          {/* HEADER DRAWER */}
          <Box p={2} display="flex" alignItems="center" gap={1}>
            <Avatar>{user?.email?.charAt(0).toUpperCase()}</Avatar>
            <Box>
              <Typography fontWeight={600}>Usuario</Typography>
              <Typography variant="caption">{user?.email}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* MENÚ */}
          <List>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Casos cerrados" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/registros")}>
              <ListItemIcon>
                <PersonOffIcon />
              </ListItemIcon>
              <ListItemText primary="Casos fallecidos" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reportes")}>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="Paciente en riesgo de perdida en el seguimiento" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reportes")}>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Contacto Sintomatico" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reportes")}>
              <ListItemIcon>
                <SignalCellularAltIcon />
              </ListItemIcon>
              <ListItemText primary="Estadisticas" />
            </ListItemButton>
          </List>

          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Eventos" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/ScheduledVisits")}>
              <ListItemIcon>
                <PersonOffIcon />
              </ListItemIcon>
              <ListItemText primary="Visitas agendadas" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reportes")}>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="Casos en espera" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reportes")}>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Contactos" />
            </ListItemButton>
          </List>
          <Divider />

          {/* LOGOUT */}
          <List>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
