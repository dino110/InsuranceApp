// Form.tsx
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Button, Grid, Box } from "@mui/material";

interface FormData {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: number;
  voucher: number;
  priceMatch: number;
}

const MainForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("submited!", { ...data });
  };

  return (
    <Box maxWidth="sm" sx={{ mt: "40px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthdate"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Birthdate"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.birthdate}
                  helperText={errors.birthdate?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="vehiclePower"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Vehicle Power (kW)"
                  type="number"
                  fullWidth
                  error={!!errors.vehiclePower}
                  helperText={errors.vehiclePower?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="voucher"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Voucher"
                  type="number"
                  fullWidth
                  error={!!errors.vehiclePower}
                  helperText={errors.vehiclePower?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="priceMatch"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price match"
                  type="number"
                  fullWidth
                  error={!!errors.vehiclePower}
                  helperText={errors.vehiclePower?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MainForm;
