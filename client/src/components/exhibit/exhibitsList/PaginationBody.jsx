import React from 'react'
import { LinearProgress } from '@material-ui/core';
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
import { getAllContributors } from '../../../redux/features/contributors/contributorsSlice';

const headRow = ['ID', 'Image', 'ExhibitName', 'Material', 'Category', 'View'];


const PaginationBody = () => {
    const [searchParams, setSechParams] = useSearchParams();
    const exhibitsPerPage = useSelector(getExhibitsSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const exhibit = useExhibit();
    const loading = useSelector(getLoading);

    const onSwitchChange = (e, id, isActive, materialName, categoryName, exhibit) => {
        const {weight, height, diameter, length, ...exhibitToUpdate } = exhibit;
        dispatch(
            update_getExhibit({
                id,
                exhibitInfo: {...exhibitToUpdate, isActive: !isActive},
                // exhibitInfo: {
                //     materialName,
                //     categoryName,
                //     isActive: !isActive
                // },
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
    const viewExhibit = (e, exhibitInfo) => {
        e.stopPropagation()
        dispatch(getAllContributors());

        setTimeout(() => {
            exhibit.setExhibit(exhibitInfo);
            navigate('/exhibit-view');

        }, 400)
    }

    const data = exhibitsPerPage.map((exhibit) => {
        const { id, exhibitName, contributors, material, category, images, isActive, creator, updater, createdAt, updatedAt } = exhibit;
        return {
            id,
            image: (!!images.length) && <img style={{ width: 80, height: 80 }} src={`${BASE_URL}images/${images[0].name}`} />,
            exhibitName,
            material: material.materialName,
            category: category.categoryName,
            btn: <Button onClick={(e) => viewExhibit(e, exhibit)}>View</Button>,
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