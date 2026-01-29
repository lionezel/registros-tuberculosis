import {
  Box,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Navbar } from "../../shared";
import { useFetchEventsTub } from "../../hook/useFetchEventsTub";
import { useState } from "react";
import { DetailDrawer } from "./components";
import { CardEventTub } from "./components/CardEventTub";

export const Home = () => {
  const { events, loading } = useFetchEventsTub();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleOpenDrawer = (item: any) => {
    setSelectedEvent(item);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedEvent(null);
  };


  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <CircularProgress />
        <Typography mt={2} color="text.secondary">
          Cargando eventos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box bgcolor="#f2f4f8" minHeight="100vh" p={2}>
        {loading}
        {isMobile ? (
          // 📱 MOBILE: lista
          <Stack spacing={2}>
            {!loading && events.map((item) => (
              <CardEventTub item={item} handleOpenDrawer={handleOpenDrawer} key={item.id} />
            ))}
          </Stack>
        ) : (
          // 💻 DESKTOP: cards
          <Grid container spacing={3}>
            {events.map((item) => (
              <Grid>
                <CardEventTub item={item} handleOpenDrawer={handleOpenDrawer} key={item.id} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <DetailDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        selectedEvent={selectedEvent}
        isMobile={isMobile}
      />

    </Box>
  );
};
