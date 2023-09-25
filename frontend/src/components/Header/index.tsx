import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Grid, FormControlLabel, Typography } from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";

interface FormData {
  commercialDiscount: boolean;
  adviserDiscount: boolean;
  vipDiscount: boolean;
  strongCarSurcharge: boolean;
}

const Header: React.FC = () => {
  const { control } = useForm<FormData>();

  const { textFields, setDiscounts } = useInsuranceContext();

  const handleChange = (name: string, value: boolean) => {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleChange("strongCarSurcharge", Number(textFields.vehiclePower) > 100);
  }, [textFields.vehiclePower]);

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
                    onChange={(e, value) => handleChange(e.target.name, value)}
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
                name="adviserDiscount"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e, value) => handleChange(e.target.name, value)}
                  />
                )}
              />
            }
            label="Adviser Discount"
          />
        </Grid>
        {Number(textFields.vehiclePower) > 80 && (
          <Grid item xs={6} md={2}>
            <FormControlLabel
              control={
                <Controller
                  name="vipDiscount"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      color="primary"
                      onChange={(e, value) =>
                        handleChange(e.target.name, value)
                      }
                    />
                  )}
                />
              }
              label="VIP Discount"
            />
          </Grid>
        )}
        <Grid item xs={6} md={2}>
          <FormControlLabel
            control={
              <Controller
                name="strongCarSurcharge"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    disabled={true}
                    checked={Number(textFields.vehiclePower) > 100}
                    color="primary"
                  />
                )}
              />
            }
            label="Strong Car Surcharge"
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
