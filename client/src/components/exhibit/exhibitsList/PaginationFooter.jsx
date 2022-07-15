import React from 'react'
import { Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getFilteredCount } from '../../../features/exhibits/selectors';
import { useSelector } from 'react-redux';
import MainSelectMUI from '../../MainSelectMUI';
import { LIMIT, SORTBY } from '../../../constants';

const PaginationFooter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredCount = useSelector(getFilteredCount);

  const handlePagination = (_, page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  const paginationAttributes = {
    page: +searchParams.get('page') || 1,
    onChange: handlePagination,
    color: "primary",
    count: Math.ceil(filteredCount / (searchParams.get('limit') || 5)),
    sx: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const sortSelectAttributes = {
    setSearchParams,
    searchParams,
    options: SORTBY,
    name: "Sort By",
    variant: "standard",
    label: "sortBy",
  };
  const limitSelectAttributes = {
    options: LIMIT,
    name: "Set Limit",
    variant: "standard",
    setSearchParams,
    searchParams,
    label: "limit",
  };
  return (
    <>
      <Stack sx={{ mt: "50px" }} spacing={2}>
        <Pagination {...paginationAttributes} />
      </Stack>

      <MainSelectMUI {...sortSelectAttributes} />
      <MainSelectMUI {...limitSelectAttributes} />
    </>
  )
}

export default PaginationFooter