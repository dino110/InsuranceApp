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

const Container = styled(Box)({
  float: "right",
  position: "relative",
  width: "260px",
  border: "1px solid red",
});

interface FormData {
  bonusProtection: boolean;
  aoPlus: boolean;
  glassCoverage: boolean;
}

const SideBar = (): JSX.Element => {
  const { control, formState } = useForm<FormData>();

  const handleChange = (name: string, isChecked: boolean) => {
    console.log(`${name} is ${isChecked ? "checked" : "unchecked"}`);
  };

  return (
    <Container>
      <Typography fontWeight={600} variant="h6" align="left">
        Coverages
      </Typography>
      <form>
        <Stack
          direction="column"
          justifyItems="left"
          padding="16px 24px"
          gap="24px"
        >
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
                    onChange={(e) =>
                      handleChange("Bonus protection", e.target.checked)
                    }
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
                    onChange={(e) => handleChange("AO +", e.target.checked)}
                  />
                )}
              />
            }
            label="AO +"
          />
          <FormControlLabel
            control={
              <Controller
                name="glassCoverage"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color="primary"
                    onChange={(e) =>
                      handleChange("Glass coverage", e.target.checked)
                    }
                  />
                )}
              />
            }
            label="Glass coverage"
          />
        </Stack>
      </form>
    </Container>
  );
};

export default SideBar;
