import React from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";

const Calculations: React.FC = () => {
  const { mainForm, discounts, coverages } = useInsuranceContext();

  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Box maxWidth="sm" sx={{ mt: "40px" }}>
      <Grid container spacing={2}></Grid>
      <Typography>Basic price: {} EUR</Typography>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 2, mb: 1 }}>Discounts:</Typography>
        <List>
          {generate(
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
          )}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 2, mb: 1 }}>Coverages:</Typography>
        <List>
          {generate(
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
          )}
        </List>
      </Grid>
      <Typography>Total price: {} EUR</Typography>
      <Grid />
    </Box>
  );
};

export default Calculations;
