import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Grid, FormControlLabel, Typography } from "@mui/material";

interface FormData {
  commercialDiscount: boolean;
  agentsDiscount: boolean;
  summerDiscount: boolean;
  strongCatSurcharge: boolean;
}

const Header: React.FC = () => {
  const { control, formState } = useForm<FormData>();

  const handleChange = (name: string, isChecked: boolean) => {
    console.log(`${name} is ${isChecked ? "checked" : "unchecked"}`);
  };

  return (
    <form>
      <Grid
        container
        columns={{ xs: 12, md: 10 }}
        alignItems="center"
        border="1px solid red"
        sx={{ padding: "16px 0px" }}
      >
        <Grid item xs={6} md={2}>
          <FormControlLabel
            control={
              <Controller
                name="commercialDiscount"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e) =>
                      handleChange("Commercial Discount", e.target.checked)
                    }
                  />
                )}
              />
            }
            label="Commercial Discount"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControlLabel
            control={
              <Controller
                name="agentsDiscount"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e) =>
                      handleChange("Agents Discount", e.target.checked)
                    }
                  />
                )}
              />
            }
            label="Agents Discount"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControlLabel
            control={
              <Controller
                name="summerDiscount"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e) =>
                      handleChange("Summer Discount", e.target.checked)
                    }
                  />
                )}
              />
            }
            label="Summer Discount"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControlLabel
            control={
              <Controller
                name="strongCatSurcharge"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e) =>
                      handleChange("Strong Cat Surcharge", e.target.checked)
                    }
                  />
                )}
              />
            }
            label="Strong Cat Surcharge"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography>
            <strong>Total price:</strong> {} EUR
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default Header;
