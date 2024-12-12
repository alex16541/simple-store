"use client";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

export const ProductTabs = () => {
  const [tab, setTab] = useState("characteristics");

  return (
    <Box>
      <Tabs
        TabIndicatorProps={{ sx: { backgroundColor: "success.main" } }}
        textColor="inherit"
        value={tab}
        onChange={(e, value) => setTab(value)}
      >
        <Tab label="Характеристики" value="characteristics" />
        <Tab label="Отзывы" value="reviews" />
      </Tabs>
      {tab === "characteristics" && <div>Характеристики</div>}
      {tab === "reviews" && <div>Отзывы</div>}
    </Box>
  );
};
