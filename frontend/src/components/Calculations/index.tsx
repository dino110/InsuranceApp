import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useInsuranceContext } from "../../InsuranceContext";

const Calculations: React.FC = () => {
  const { discountPrices, coveragePrices, insurancePrices, mainForm } =
    useInsuranceContext();

  return (
    <Stack direction="column" gap={2} sx={{ margin: "32px 0 40px 16px" }}>
      <Box>
        <Typography fontWeight="bold" display="inline">
          Base price:
        </Typography>
        <Typography display="inline" marginLeft={1}>
          {insurancePrices.basePrice} EUR
        </Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">Discounts / surcharges:</Typography>
        <Stack
          direction="column"
          gap={1}
          sx={{ paddingLeft: "16px", marginTop: "8px" }}
        >
          {discountPrices.commercialDiscount !== 0 && (
            <Typography>
              Commercial discount: {discountPrices.commercialDiscount} EUR
            </Typography>
          )}
          {discountPrices.adviserDiscount !== 0 && (
            <Typography>
              Adviser discount: {discountPrices.adviserDiscount} EUR
            </Typography>
          )}
          {discountPrices.vipDiscount !== 0 && (
            <Typography>
              VIP discount: {discountPrices.vipDiscount} EUR
            </Typography>
          )}

          {discountPrices.strongCarSurcharge !== 0 && (
            <Typography>
              Strong car surcharge: {discountPrices.strongCarSurcharge} EUR
            </Typography>
          )}
        </Stack>
      </Box>
      <Box>
        <Typography fontWeight="bold">Coverages:</Typography>
        <Stack
          direction="column"
          gap={1}
          sx={{ paddingLeft: "16px", marginTop: "8px" }}
        >
          {coveragePrices.bonusProtection !== 0 && (
            <Typography>
              Bonus protection: {coveragePrices.bonusProtection} EUR
            </Typography>
          )}
          {coveragePrices.aoPlus !== 0 && (
            <Typography>AO+: {coveragePrices.aoPlus} EUR</Typography>
          )}
          {coveragePrices.glassProtection !== 0 && (
            <Typography>
              Glass protection: {coveragePrices.glassProtection} EUR
            </Typography>
          )}
        </Stack>
      </Box>
      <Box>
        <Typography fontWeight="bold" display="inline">
          Total price:
        </Typography>
        <Typography display="inline" marginLeft={1}>
          {insurancePrices.totalPrice} EUR
        </Typography>
        {+mainForm.voucher > 0 && (
          <Typography display="inline" ml={2} fontSize={14}>
            ({mainForm.voucher} EUR voucher included)
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Calculations;
