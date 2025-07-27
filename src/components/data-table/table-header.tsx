import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
// CUSTOM ICON COMPONENT
import UpDown from "icons/UpDown";

// STYLED COMPONENTS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  padding: "16px 20px",
  color: theme.palette.grey[900]
}));

// ==============================================================
type Head = { id: string; label: string; align: string };
interface Props {
  heading: Head[];
  orderBy: string;
  order: "asc" | "desc";
  onRequestSort: (id: string) => void;
}
// ==============================================================

export default function TableHeader({ order, heading, orderBy, onRequestSort }: Props) {
  return (
    <TableHead sx={{ backgroundColor: "grey.200" }}>
      <TableRow>
        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align as TableCellProps["align"]}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{ "& .MuiTableSortLabel-icon": { opacity: 1 } }}
              IconComponent={() => <UpDown sx={{ fontSize: 14, ml: 1, color: "grey.600" }} />}>
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
