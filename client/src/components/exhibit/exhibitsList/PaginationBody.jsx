import React from 'react'
import { LinearProgress, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { update_getExhibit } from '../../../redux/features/exhibits/exhibitsSlice';
import { getExhibitsSelector, getLoading } from '../../../redux/features/exhibits/selectors'
import MainTable from '../../listOfUsers/MainTable';
import { BASE_URL } from '../../../constants';
import Button from '../../FormsUI/Button';
import { useExhibit } from '../../../redux/features/exhibits/ExhibitsContextProvider';
import { getExhbitQueries } from '../../listOfUsers/dialogs/updateDialog/helpers';
import { setSnackbar } from '../../../redux/features/snackbar/SnackbarSlice';

const headRow = ['ID', 'Image', 'ExhibitName', 'Material', 'Category', 'View', 'Activate/Disactivate'];


const PaginationBody = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const exhibitsPerPage = useSelector(getExhibitsSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const exhibit = useExhibit();
    const loading = useSelector(getLoading);

    const onSwitchChange = (e, id, isActive, materialName, categoryName) => {
        dispatch(
            update_getExhibit({
                id,
                exhibitInfo: {
                    materialName,
                    categoryName,
                    isActive: !isActive
                },
                ...getExhbitQueries(searchParams),
            })
        );
        const message = `Exhibit with ID: ${id} is ${isActive ? "DEACTIVATED" : "ACTIVATED"
            }`;

        dispatch(setSnackbar({
            snackbarOpen: true,
            snackbarMessage: message,
            snackbarType: "success",
        }))
    };
    const viewExhibit = (exhibitInfo) => {
        exhibit.setExhibit(exhibitInfo);
        navigate('/exhibit-view');
    }

    const data = exhibitsPerPage.map((exhibit) => {
        const { id, exhibitName, contributors, material, category, images, isActive, creator, updater, createdAt, updatedAt } = exhibit;
        return {
            id,
            image: (!!images.length) && <img style={{ width: 80, height: 80 }} src={`${BASE_URL}images/${images[0].name}`} />,
            exhibitName,
            material: material.materialName,
            category: category.categoryName,
            btn: <Button onClick={() => viewExhibit(exhibit)}>View</Button>,
            switch: <Switch color="primary" checked={isActive} onClick={(e) => e.stopPropagation()} onChange={(e) => onSwitchChange(e, id, isActive, material.materialName, category.categoryName)} />,
            history: {
                headRows: ["Creator", "Updater", "CreatedAt", "UpdatedAt"],
                data: [{
                    creator: `${creator.firstName} ${creator.lastName}`,
                    updater: !!updater && `${updater?.firstName} ${updater?.lastName}`,
                    createdAt,
                    updatedAt
                }]
            }
        }
    })


    return (
        <>
            {loading && <LinearProgress />}
            <MainTable style={{ opacity: loading ? 0.7 : 1 }} headRow={headRow} data={data} />
        </>
    )
}

export default PaginationBody