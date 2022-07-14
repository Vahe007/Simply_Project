import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { classes } from "../../styles/usersListStyles";
import { v4 as uuid } from "uuid";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getTableRowUtilityClass } from "@mui/material";

function MainTable(props) {
  const { headRow, data, ...otherProps } = props;

  return (
    <Paper {...otherProps} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {headRow.map((column) => (
              <TableCell key={uuid()} align="left">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((row) => (
            <Row key={uuid()} row={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default MainTable;







function Row({ row }) {
  const { history={}, ...remainingData } = row;

  const [expand, setExpand] = useState(false);
  return (
    <>
      <TableRow onClick={() => setExpand(!expand)} key={uuid()}>
        {Object.values(remainingData).map((value) => (
          <TableCell key={uuid()} alight="left">
            {value}
          </TableCell>
        ))}
      </TableRow>
      {!!Object.keys(history).length &&
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
                      {history.headRows.map((headRow) => (
                        <TableCell key={uuid()}>{headRow}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.data.map((row) => (
                      <TableRow key={uuid()}>
                        {Object.values(row).map((value) => (
                          <TableCell key={uuid()}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </>

  )

}






//trying to highlight searched text
/**import Table from '@material-ui/core/Table';
iimport Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { classes } from '../../styles/materialsStyle';

function MainTable(props) {
    let id = 0;
    const {headRow, data} = props;
    const search = props.searchParams.get("contains");
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                    headRow.map(column =>  <TableCell key={id++} align='left'>{column}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={id++}>
                    {
                        Object.values(row).map(value => {
                          console.log(typeof value);
                          if(typeof value === 'string' && value.includes(search)) {
                            value = <span>{value}</span>
                            console.log(value);
                            let z = value.props.children.replace(search, `<mark>${search}</mark>`)
                            // const htmlElement = value.textContent.replace(search, `<mark> bb </mark>`);
                            // console.log(htmlElement);
                            return <TableCell key={id++} alighn="left">{z}</TableCell>
                          } else {
                            return <TableCell key={id++} alighn="left">{value}</TableCell>
                          }
                        })
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
}

export default MainTable**/
