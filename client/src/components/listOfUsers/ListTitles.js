import { fontSize } from '@mui/system';
import {v4 as uuid} from 'uuid'
import { classes } from '../../styles/usersListStyles';

const ListTitles = () => {
    const titles = ['ID', 'First name' ,'Last name' ,'Email', 'Phone number' ,'Role' ,'created At' ,'updated At', 'Exhibits Added', 'Edit', 'Activate/Deactivate'];

    return (
        <li className={classes.li} style={{fontWeight: "bold"}}>
           { titles.map(title => <span className={classes.liSpan} key={uuid()}>{title}</span>) }
        </li>
    )
}

export default ListTitles;