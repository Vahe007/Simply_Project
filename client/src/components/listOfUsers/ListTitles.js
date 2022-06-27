import {v4 as uuid} from 'uuid'
import { classes } from './styles';

const ListTitles = () => {
    const titles = ['First name' ,'Last name' ,'Email', 'Phone number' ,'Role' ,'created At' ,'updated At', 'Exhibits Added'];

    return (
        <li className={classes.li}>
           { titles.map(title => <span className={classes.liSpan} key={uuid()}>{title}</span>) }
        </li>
    )
}

export default ListTitles;