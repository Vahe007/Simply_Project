import {v4 as uuid} from 'uuid'

const ListTitles = () => {
    const titles = ['name' ,'surname' ,'email', 'phone number' ,'role' ,'created At' ,'updated At', 'Exhibits Added' , ,'Edit' , 'Delete'];

    return (
        <li>
           { titles.map(title => <span key={uuid()}>{title}</span>) }
        </li>
    )
}

export default ListTitles;