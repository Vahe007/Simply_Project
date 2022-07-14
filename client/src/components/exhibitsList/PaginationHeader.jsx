import React, { useEffect } from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getFilteredCount } from '../../features/exhibits/selectors';
import { getCategories, getMaterials } from '../../features/filteringFeatures/filteringFeaturesSlice';
import { getAllCategories, getAllMaterials } from '../../features/filteringFeatures/selectors';
import { debounce } from '../../helpers/common';
import FilteringSelect from '../FilteringSelect';
import Search from '../Search';
import { getExhibitsPerPage } from '../../features/exhibits/exhibitsSlice';
import { getExhbitQueries } from '../listOfUsers/dialogs/updateDialog/helpers';
import MainRadioButtons from '../listOfUsers/MainRadioButtons';

const PaginationHeader = () => {
    const dispatch = useDispatch();
    const materials = useSelector(getAllMaterials);
    const categories = useSelector(getAllCategories);
    const filteredCount = useSelector(getFilteredCount);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        // setSearchParams(getExhbitQueries(searchParams));
        dispatch(getMaterials());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        dispatch(getExhibitsPerPage(getExhbitQueries(searchParams)));
    }, [searchParams]);





    const handleSearch = ({ target: { value } }) => {
        value ? searchParams.set("contains", value) : searchParams.delete("contains");
        searchParams.set('page', 1);
        setSearchParams(searchParams);
    };

    const handleSearchDebounce = debounce(handleSearch, 500);

    const materialsSelectAttributes = {
        options: materials,
        variant: "standard",
        name: "Material",
        setSearchParams,
        searchParams,
        label: "material",
        filteredCount,
    };

    const categoriesSelectAttributes = {
        options: categories,
        variant: "standard",
        name: "Categories",
        setSearchParams,
        searchParams,
        label: "category",
        filteredCount,
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Search onChange={handleSearchDebounce} />

                <div>
                    <FilteringSelect {...materialsSelectAttributes} />
                    <FilteringSelect {...categoriesSelectAttributes} />
                </div>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MainRadioButtons
                    labels={["All Exhibits", "Active Exhibits", "Inactive Exhibits"]}
                    values={["allExhibits", "activeExhibits", "inactiveExhibits"]}
                />
            </div>

        </>
    )
}

export default PaginationHeader;