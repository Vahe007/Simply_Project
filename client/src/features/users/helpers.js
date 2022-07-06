// import { useDispatch } from "react-redux";
// import { useUsersContext } from "./UsersContextProvider";
// import { getUsersPerPage } from "./usersSlice";

// export function blabla() {
//     const {page, limit, sortBy, searchInputValue, setPage, setSearchInputValue, addUserData, setAddUserData} = useUsersContext();
//     const dispatch = useDispatch();
//     return {
//         onPageChange: e => {
//             const currentPage = +e.target.textContent;
//             setPage(currentPage);
//             dispatch(getUsersPerPage({page: currentPage, sortBy, limit, contains: searchInputValue}));
//         },

//         onSearchInputChange: (e) => {
//             setSearchInputValue(e.target.value)
//             dispatch(getUsersPerPage({page, sortBy, limit, contains: e.target.value}));
//         },

//         onAddClick: (user) => {
//             setAddUserData(user)
//         },
        
//         onAddClose: () => {
//             setAddUserData(null)
//         },

//         onAddConfirm: (data) => {
//             dispatch(createUser(data));
//             setTimeout(() => {
//                 dispatch(getUsersPerPage({page, limit, sortBy, contains: searchInputValue}))
//             }, 0)
//             onAddClose();
//         }
//     }
// }


// export const onPageChange = e => {
//     const currentPage = +e.target.textContent;
//     setPage(currentPage);
//     dispatch(getUsersPerPage({page: currentPage, sortBy, limit, contains: searchInputValue}));
// }

// export const onSearchInputChange = (e) => {
//     setSearchInputValue(e.target.value)
//     dispatch(getUsersPerPage({page, sortBy, limit, contains: e.target.value}));
//   }

// export const onAddClick = (user) => {
//     setAddUserData(user)
//   }  

// export const onAddClose = () => {
//     setAddUserData(null)
//   }

// export const onAddConfirm = (data) => {
//     dispatch(createUser(data));
//     setTimeout(() => {
//         dispatch(getUsersPerPage({page, limit, sortBy, contains: searchInputValue}))
//     }, 0)
//     onAddClose();
// }
