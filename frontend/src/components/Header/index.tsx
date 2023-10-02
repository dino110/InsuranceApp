import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Grid, FormControlLabel, Typography } from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";

export interface Discounts {
  commercialDiscount: boolean;
  adviserDiscount: boolean;
  vipDiscount: boolean;
  strongCarSurcharge: boolean;
}

const Header: React.FC = () => {
  const { control } = useForm<Discounts>();

  const { mainForm, setDiscounts, insurancePrices } = useInsuranceContext();

  const handleChange = (name: string, value: boolean) => {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleChange("strongCarSurcharge", Number(mainForm.vehiclePower) > 100);
  }, [mainForm.vehiclePower]);

  return (
    <Grid
      container
      columns={{ xs: 12, md: 10 }}
      alignItems="center"
      sx={{ padding: "16px 8px", backgroundColor: "#D3D3D3" }}
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
          label="Commercial discount"
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
          label="Adviser discount"
        />
      </Grid>
      {Number(mainForm.vehiclePower) > 80 && (
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
                    onChange={(e, value) => handleChange(e.target.name, value)}
                  />
                )}
              />
            }
            label="VIP discount"
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
                  checked={Number(mainForm.vehiclePower) > 100}
                  color="primary"
                />
              )}
            />
          }
          label="Strong car surcharge"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        order={{ xs: "-9999", md: "9999" }}
        mb={{ xs: "12px", md: "0px" }}
      >
        <Typography>
          <strong>Total price:</strong> {insurancePrices.totalPrice} EUR
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
