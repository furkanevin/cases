import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useContext } from "../../../context/context";

const TableDisplay = () => {
  const [rows, setRows] = React.useState();
  const [data, dispatch] = useContext();

  const manipulatedData = React.useMemo(() => {
    const filteredData = data.nucleoid.functions.filter(
      (item) => item.type === "CLASS"
    );

    return filteredData.map((item) => {
      const params = item.params.map((param) => {
        const label = param.split(":")[0].trim();
        const value = param.split(":")[1].trim();
        return { label, value };
      });

      return {
        path: item.path,
        type: item.type,
        params,
      };
    });
  }, [data]);

  React.useEffect(() => {
    dispatch({ type: "ADD_FUNCTION" });
  }, []);

  return (
    <Container sx={{ marginTop: "50px" }}>
      <h1>FUNCTIONS TABLE</h1>
      <Stack
        onClick={() => dispatch({ type: "ADD_FUNCTION" })}
        sx={{ marginBottom: "30px" }}
        alignItems={"end"}
      >
        <Button color="primary" variant="contained">
          Add New Field
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Path</TableCell>
              <TableCell align="right">Name Type</TableCell>
              <TableCell align="right">Barcod Type</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {manipulatedData.map((item) => (
              <TableRow
                key={item.path}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.path}
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} justifyContent={"end"} gap={2}>
                    <span>{item.params[0].value}</span>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} justifyContent={"end"} gap={2}>
                    <span>{item.params[1].value}</span>
                  </Stack>
                </TableCell>
                <TableCell align="right">{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableDisplay;
