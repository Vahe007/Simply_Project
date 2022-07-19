import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { classes } from "../../styles/usersListStyles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import { getTableRowUtilityClass } from "@mui/material";
import { useCustomSearchParams } from "./SearchParamsContext";

function MainTable(props) {
  const { headRow, data, ...otherProps } = props;

  return (
    <Paper {...otherProps} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {headRow.map((column, index) => (
              <TableCell key={`${column}${index}`} align="left">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <Row key={`${row}${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default MainTable;

function Row({ row }) {
  const { history = {}, ...remainingData } = row;

  const [expand, setExpand] = useState(false);
  return (
    <>
      <TableRow onClick={() => setExpand(!expand)}>
        {Object.values(remainingData).map((value, index) => (
          <TableCell key={`${value}${index}`} alight="left">
            {value}
          </TableCell>
        ))}
      </TableRow>
      {!!Object.keys(history).length && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={expand} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {history.headRows.map((headRow, index) => (
                        <TableCell key={`${headRow}${index}`}>
                          {headRow}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.data.map((row, index) => (
                      <TableRow key={uuid()}>
                        {Object.values(row).map((value) => (
                          <TableCell key={uuid()}>
                            {value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}



