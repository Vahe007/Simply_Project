import React, { useEffect } from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getFilteredCount } from '../../../redux/features/exhibits/selectors';
import { getCategories, getMaterials } from '../../../redux/features/filteringFeatures/filteringFeaturesSlice';
import { getAllCategories, getAllMaterials } from '../../../redux/features/filteringFeatures/selectors';
import { debounce } from '../../../helpers/common';
import FilteringSelect from '../../FilteringSelect';
import Search from '../../Search';
import { getExhibitsPerPage } from '../../../redux/features/exhibits/exhibitsSlice';
import { getExhbitQueries, getQueries } from '../../listOfUsers/dialogs/updateDialog/helpers';
import MainRadioButtons from '../../listOfUsers/MainRadioButtons';

const PaginationHeader = () => {
    const dispatch = useDispatch();
    const materials = useSelector(getAllMaterials);
    const categories = useSelector(getAllCategories);
    const filteredCount = useSelector(getFilteredCount);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        dispatch(getMaterials());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        console.log("worked");
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

    const handleChange = (_, value) => {
        switch (value) {
          case "allExhibits": {
            searchParams.set("page", 1);
            setSearchParams(getQueries(searchParams, ["isActive"]));
            break;
          }
    
          case "activeExhibits": {
            searchParams.set("page", 1);
            searchParams.set("isActive", true);
            setSearchParams(searchParams);
            break;
          }
          case "inactiveExhibits": {
            searchParams.set("page", 1);
            searchParams.set("isActive", false);
            setSearchParams(searchParams);
            break;
          }
        }
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
                    handleChange={handleChange}
                    defaultValue="allExhibits"
                />
            </div>

        </>
    )
}

export default PaginationHeader;