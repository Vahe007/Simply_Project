import React from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import {Autocomplete, Checkbox, ListItemText, Grid, List, ListItem, TextField, Stack} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <IndeterminateCheckBoxOutlinedIcon sx={{color: 'success.light'}}/> :
                            <AddBoxOutlinedIcon sx={{color: 'red'}}/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <img src={row.images[0]} style={{width: '30px', height: '40px'}}/>
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Recoveries
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell align="right">Marks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell> {historyRow.date}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};


function Employee(props) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const top100Films = [
        {title: 'The Shawshank Redemption', year: 1994},
        {title: 'The Godfather', year: 1972},
    ];
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = [
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },
        {
            name: 'Frozen yoghurt',
            images: ['https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/03/bust-of-nefertiti.jpg'],
            calories: 159,
            fat: 159,
            carbs: 159,
            protein: 159,
            price: 159,
            history: [{
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }, {
                amount: 100,
                customerId: 11,
                date: '2022-11-11'
            }]
        },

    ];

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={12} sx={{height: '70px', backgroundColor: 'primary.main'}}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
            </Grid>
            <Grid item xs={4} md={3} sx={{backgroundColor: '#f7f7f7', padding: '5px'}}>
                <Stack spacing={2}>
                    <Box sx={{padding: '5px', backgroundColor: 'white', borderRadius: '10px'}}>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={top100Films}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, {selected}) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{marginRight: 8}}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Material" placeholder="Favorites"/>
                            )}
                        />
                    </Box>
                    <Box sx={{padding: '5px', backgroundColor: 'white', borderRadius: '10px'}}>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={top100Films}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, {selected}) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{marginRight: 8}}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Status" placeholder="Favorites"/>
                            )}
                        />
                    </Box>

                    <Stack direction={'column'} bgcolor='white' sx={{padding: '5px', borderRadius: '10px'}}>
                        <Box>Կատեգորիաներ</Box>
                        <List>
                            <ListItem>
                                <FormControlLabel control={<Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{marginRight: 8}}
                                />} label="Կատեգորիա 1"/>
                            </ListItem>
                            <ListItem>
                                <FormControlLabel control={<Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{marginRight: 8}}
                                />} label="Կատեգորիա 2"/>
                            </ListItem>
                            <ListItem>
                                <FormControlLabel control={<Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{marginRight: 8}}
                                />} label="Կատեգորիա 3"/>
                            </ListItem>
                            <ListItem>
                                <FormControlLabel control={<Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{marginRight: 8}}
                                />} label="Կատեգորիա 4"/>
                            </ListItem>
                        </List>
                    </Stack>
                    <Button color="primary" variant="contained" startIcon={<AddIcon/>}>
                        Create New Exhibit
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={8} md={9} p={2}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">images</TableCell>
                                <TableCell align="right">fundNumber</TableCell>
                                <TableCell align="right">exhibitName</TableCell>
                                <TableCell align="right">creationPeriod</TableCell>
                                <TableCell align="right">placeOfOrigin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <Row key={row.name} row={row}/>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    )
}

export default Employee;


//  Search fields
// fundNumber
// exhibitName
// description
// creationPeriod
// placeOfOrigin
// contributors
// acquisitionPeriod

// exhibitions
// recoveries

// Filter fields
// category
// status
// material


// weight
// diameter
// length
// height
// width


