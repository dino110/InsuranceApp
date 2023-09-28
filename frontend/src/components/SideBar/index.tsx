import React from "react";
import {
  Stack,
  styled,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useInsuranceContext } from "../../InsuranceContext";

export interface Coverages {
  bonusProtection: boolean;
  aoPlus: boolean;
  glassProtection: boolean;
}

const Container = styled(Box)({
  float: "right",
  position: "relative",
  width: "260px",
  border: "1px solid red",
});

const SideBar = (): JSX.Element => {
  const { control } = useForm<Coverages>();

  const { setCoverages } = useInsuranceContext();

  const handleChange = (name: string, value: boolean) => {
    setCoverages((prevCoverages) => ({
      ...prevCoverages,
      [name]: value,
    }));
  };

  return (
    <Container>
      <form>
        <Stack
          direction="column"
          justifyItems="left"
          padding="16px 24px"
          gap="16px"
        >
          <Typography fontWeight={600} variant="h6" align="left">
            Coverages
          </Typography>
          <FormControlLabel
            control={
              <Controller
                name="bonusProtection"
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
            label="Bonus protection"
          />
          <FormControlLabel
            control={
              <Controller
                name="aoPlus"
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
            label="AO +"
          />
          <FormControlLabel
            control={
              <Controller
                name="glassProtection"
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
            label="Glass protection"
          />
        </Stack>
      </form>
    </Container>
  );
};

export default SideBar;
