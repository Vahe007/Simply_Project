import {
  decreasePage,
  getContributors,
  increasePage,
  searchContributors,
  selectContributors,
  setHasMoreToTrue,
} from "../../redux/features/contributors/contributorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { classes } from "./styles";
import { BASE_URL } from "../../constants";
import { InputBase } from "@mui/material";
import { getQueries } from "../listOfUsers/dialogs/updateDialog/helpers";
import { useCustomSearchParams } from "../listOfUsers/SearchParamsContext";
import { Button } from "@material-ui/core";
import UpdateContributorDialog from "./UpdateContributorDialog";

function ShowContributorsList() {
  const dispatch = useDispatch();
  const [isInitial, setisInitial] = useState(true);
  const { contributorsByChunk, page, loading, hasMore, allContributors } =
    useSelector(selectContributors);
  const [editContributorData, setEditContributorData] = useState(null);
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const searchInputWrapper = (value) => {
    let timerId;

    return (evt) => {
      clearTimeout(timerId);
      dispatch(decreasePage());

      const { value } = evt.target;

      timerId = setTimeout(() => {
        if (value) {
          searchParams.set("contains", value);
          setSearchParams(searchParams);
        } else {
          setSearchParams(getQueries(searchParams, ["contains"]));
        }
      }, 600);
    };
  };
  useEffect(() => {
    if (hasMore) {
      dispatch(
        getContributors({
          page: page,
          limit: 15,
          contains: searchParams.get("contains"),
        })
      );
    }
    setisInitial(false);
  }, [page]);

  useEffect(() => {
    if (!isInitial) {
      dispatch(
        searchContributors({
          page: 1,
          limit: 15,
          contains: searchParams.get("contains"),
        })
      );
    }

    return () => {
      setisInitial(false);
      dispatch(
        searchContributors({
          page: 1,
          limit: 15,
          contains: searchParams.get("contains"),
        })
      );
    };
  }, [searchParams]);

  const onSearchInputChange = searchInputWrapper();

  const scrollToEnd = () => {
    dispatch(increasePage());
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  const onEditClose = () => {};
  const onEditClick = (contributor) => {
    setEditContributorData(contributor);
  };
  return (
    <>
      <InputBase
        onChange={onSearchInputChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search for contributor"
      />

      <ul className={classes.contributorsListContainer}>
        {contributorsByChunk.map((contributor, index) => {
          const contributorName = contributor.contributorName;
          const contributorSurname = contributor.contributorSurname;

          return (
            <li className={classes.contributorsItem} key={index}>
              <span className={classes.flexGrow}>
                {contributorName} {contributorSurname}
              </span>
              <Button
                variant="contained"
                onClick={() => {
                  onEditClick(contributor);
                }}
              >
                Edit
              </Button>
              <span className={classes.span}>
                {contributor.exhibits.length} Contributions
              </span>
            </li>
          );
        })}
      </ul>
      <div>{loading && "Loading.."}</div>
      {editContributorData && (
        <UpdateContributorDialog
          onClose={onEditClose}
          editContributorData={editContributorData}
          setEditContributorData={setEditContributorData}
          user={editContributorData}
        />
      )}
    </>
  );
}

export default ShowContributorsList;
