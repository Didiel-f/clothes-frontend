"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// STYLED COMPONENT
import { SearchOutlinedIcon } from "./styles";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      const params = new URLSearchParams(searchParams);
      params.set("q", search);
      router.push(`/products/search?${params.toString()}`);
      setSearch("");
    }
  };

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": { border: 0 }
    },
    endAdornment: (
      <Button
        color="primary"
        disableElevation
        variant="contained"
        onClick={handleSearch}
        sx={{ px: "3rem", height: "100%", borderRadius: "0 4px 4px 0" }}>
        Buscar
      </Button>
    ),
    startAdornment: <SearchOutlinedIcon fontSize="small" />
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscando..."
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{ input: INPUT_PROPS }}
      />
    </Box>
  );
}
