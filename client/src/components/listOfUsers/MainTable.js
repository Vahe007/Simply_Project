import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { classes } from '../../styles/materialsStyle';
import {v4 as uuid} from 'uuid';

function MainTable(props) {
    const {headRow, data} = props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                    headRow.map(column =>  <TableCell key={uuid()} align='left'>{column}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                    {
                        Object.values(row).map(value => <TableCell key={uuid()} alight="left">{value}</TableCell>)
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
}

export default MainTable;