"use client";

import { useEffect, useState } from "react";
// MUI
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
// MUI UTILS METHODS
import debounce from "lodash/debounce";
// MUI ICON COMPONENTS
import Clear from "@mui/icons-material/Clear";
// LOCAL CUSTOM COMPONENT
import SocialIcons from "./social-icons";
// STYLED COMPONENTS
import { Wrapper } from "./styles";

// ======================================================
type Props = { image?: string };
// ======================================================

export default function Newsletter({ image = "/assets/images/newsletter/bg-1.png" }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  
  const handleClose = () => {
    if (dontShowAgain) {
      window.sessionStorage.setItem("newsletter-dismissed", "true");
    }
    setOpen(false);
    setMessage(null);
  };

  const handleSubscribe = async () => {
    if (!email || !isValidEmail(email)) {
      setMessage({ type: "error", text: "Por favor ingresa un email válido" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: data.alreadySubscribed 
            ? "Ya estás suscrito a nuestro newsletter" 
            : "¡Gracias por suscribirte! Revisa tu correo." 
        });
        setEmail("");
        
        // Cerrar el modal después de 3 segundos si fue exitoso
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Error al suscribirte" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error al procesar la suscripción" });
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubscribe();
    }
  };

  useEffect(() => {
    if (!window) return;

    if (!window.sessionStorage.getItem("newsletter") && !window.sessionStorage.getItem("newsletter-dismissed")) {
      debounce(() => {
        setOpen(true);
        window.sessionStorage.setItem("newsletter", "true");
      }, 2000)();
    }
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Newsletter Modal"
        sx={{ zIndex: 999999999 }}>
        <Wrapper img={image}>
          <Grid container spacing={2}>
            <Grid size={{ md: 6, xs: 12 }} display={{ md: "flex", xs: "none" }} />

            <Grid size={{ md: 6, xs: 12 }} alignItems="center">
              <div className="content">

                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontSize: 36,
                    fontWeight: 600,
                    span: { color: "primary.main" }
                  }}>
                  Suscribete a <span>ZAG</span>
                </Typography>

                <Typography variant="body1" sx={{ color: "grey.600", mb: 3 }}>
                  y entérate primero de las novedades y descuentos.
                </Typography>

                {message && (
                  <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="emailInput"
                  placeholder="Ingresa tu correo"
                />

                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary" 
                  sx={{ p: 1.5 }}
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Ser parte de ZAG"
                  )}
                </Button>

                <SocialIcons />

                <FormControlLabel 
                  control={
                    <Checkbox 
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                    />
                  } 
                  label="No mostrar de nuevo" 
                />
              </div>
            </Grid>
          </Grid>

          <IconButton onClick={handleClose} className="clear-btn">
            <Clear color="inherit" />
          </IconButton>
        </Wrapper>
      </Modal>
    </ClickAwayListener>
  );
}
