import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { classes } from '../../styles/materialsStyle';

function MainTable(props) {
    let id = 0;
    const {headRow, data} = props;
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
                        Object.values(row).map(value => <TableCell key={id++} alight="left">{value}</TableCell>)
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
}

export default MainTable;






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
