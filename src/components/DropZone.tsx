import { useCallback } from "react";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// DROPZONE
import { useDropzone } from "react-dropzone";

// ========================================================
interface Props {
  info?: string;
  onChange: (files: File[]) => void;
}
// ========================================================

export default function DropZone({ onChange, info }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => onChange(acceptedFiles), [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] }
  });

  return (
    <Box
      py={6}
      px={{ md: 10, xs: 4 }}
      display="flex"
      minHeight="200px"
      textAlign="center"
      alignItems="center"
      borderRadius="10px"
      border="1.5px dashed"
      flexDirection="column"
      borderColor="grey.300"
      justifyContent="center"
      bgcolor={isDragActive ? "grey.200" : "grey.100"}
      sx={{ transition: "all 250ms ease-in-out", outline: "none", cursor: "pointer" }}
      {...getRootProps()}>
      <input {...getInputProps()} />

      <Typography variant="h5" sx={{ color: "grey.600" }}>
        Drop file here or click to upload
      </Typography>

      <Divider
        sx={{
          my: 3,
          span: { color: "text.disabled", px: 1 },
          "::before, ::after": { borderColor: "grey.300", width: 70 }
        }}>
        <span>OR</span>
      </Divider>

      <Button type="button" variant="outlined" color="info" sx={{ px: 4, mb: 4 }}>
        Select files
      </Button>

      <Typography variant="body1" sx={{ color: "grey.600", fontSize: 13 }}>
        {info || "Drop files here or click to browse through your machine."}
      </Typography>
    </Box>
  );
}
