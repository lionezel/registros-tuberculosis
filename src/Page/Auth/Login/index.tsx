import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../../assets/logo/download.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/cofing";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  const handleGoogleLogin = async () => {
    setError("");

    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f7fa"
    >
      <Paper
        elevation={3}
        sx={{
          width: 360,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            component="img"
            src={Logo}
            alt="Logo Alcaldía"
            sx={{
              width: 140,
              maxHeight: 80,
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Inicie sesión para continuar
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Inicie sesión para comenzar a diligenciar casos de tuberculosis.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          placeholder="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          placeholder="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          sx={{
            mt: 2,
            py: 1.3,
            borderRadius: 2,
            bgcolor: "#000",
            "&:hover": { bgcolor: "#111" },
          }}
          variant="contained"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>

        <Divider sx={{ my: 3 }}>O continuar con</Divider>

        <Box display="flex" justifyContent="center">
          <IconButton
            sx={{
              border: "1px solid #e0e0e0",
              width: 80,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" mt={3} color="text.secondary">
          ¿No tienes cuenta?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Regístrate
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};
