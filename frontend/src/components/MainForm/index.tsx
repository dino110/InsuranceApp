import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Button, Grid, Box } from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";
import { getInsurancePrice } from "../../api";

export interface FormData {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: string;
  voucher: string;
  priceMatch: string;
}

const MainForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { discounts, coverages, setMainForm } = useInsuranceContext();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setMainForm((prevMainForm) => ({ ...prevMainForm, ...formData }));
    console.log("submited!", { formData, discounts, coverages });
    const prices = await getInsurancePrice({ formData, discounts, coverages });
    console.log({ prices });
  };

  const handleVehiclePowerChange = (value: string) => {
    setMainForm((prevMainForm) => ({
      ...prevMainForm,
      vehiclePower: value,
    }));
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
                required: "Name is required",
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
                required: "Birthdate is required",
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
                required: "City is required",
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
                required: "Vehicle power is required",
                min: {
                  value: 1,
                  message: "Vehicle power needs to be at least 1",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Vehicle Power (kW)"
                  type="number"
                  fullWidth
                  onBlur={(e) => {
                    handleVehiclePowerChange(e.target.value);
                  }}
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
              defaultValue="0"
              render={({ field }) => (
                <TextField {...field} label="Voucher" type="number" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="priceMatch"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price match"
                  type="number"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MainForm;
