import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";
import { getInsurancePrice } from "../../api";

export interface CustomerData {
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
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<CustomerData>();

  const {
    discounts,
    coverages,
    customerData,
    setCustomerData,
    setCoveragePrices,
    setDiscountPrices,
    setInsurancePrices,
  } = useInsuranceContext();

  const getAndSetPrices = async (formData = customerData) => {
    const allPrices = await getInsurancePrice({
      customerData: formData,
      discounts,
      coverages,
    });

    if (allPrices.status === "success") {
      const { insurancePrices, coveragePrices, discountPrices } =
        allPrices.data;
      setCoveragePrices(coveragePrices);
      setDiscountPrices(discountPrices);
      setInsurancePrices(insurancePrices);
    } else {
      alert(allPrices.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful === true && isValid) {
      getAndSetPrices();
    }
  }, [
    discounts.commercialDiscount,
    discounts.adviserDiscount,
    discounts.vipDiscount,
    coverages,
  ]);

  const onSubmit: SubmitHandler<CustomerData> = (formData) => {
    setCustomerData((prevcustomerData) => ({
      ...prevcustomerData,
      ...formData,
    }));
    getAndSetPrices(formData);
  };

  const handleVehiclePowerChange = (value: string) => {
    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      vehiclePower: value,
    }));
  };

  return (
    <Box maxWidth="460px" sx={{ mt: "40px", ml: "16px" }}>
      <Typography fontWeight="bold" fontSize="24px" sx={{ margin: "16px 0px" }}>
        User data
      </Typography>
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
                <TextField
                  {...field}
                  label="Voucher"
                  type="number"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">EUR</InputAdornment>
                    ),
                  }}
                />
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">EUR</InputAdornment>
                    ),
                  }}
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
