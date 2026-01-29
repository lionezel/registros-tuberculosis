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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Logo from "../../assets/logo/download.png";
import { auth } from "../../firebase/cofing";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
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

  const mainMenu = [
    {
      label: "Todos los Casos",
      path: "/",
      icon: <ChecklistIcon />,
    },
    {
      label: "Visitas agendadas",
      path: "/ScheduledVisits",
      icon: <CalendarMonthIcon />,
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
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  sx={{
                    bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "primary.main" : "inherit",
                    },
                    "& .MuiListItemText-primary": {
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
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
