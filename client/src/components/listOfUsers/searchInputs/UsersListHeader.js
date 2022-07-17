import { Input } from "@mui/material";
import { classes } from "../../../styles/usersListStyles";
import AddUser from "../AddUser";
import MainRadioButtons from "../MainRadioButtons";
import { getQueries } from "../dialogs/updateDialog/helpers";
import { useCustomSearchParams } from "../SearchParamsContext";

function UsersListHeader() {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const handleChange = (_, value) => {
    switch (value) {
      case "allUsers": {
        searchParams.set("page", 1);
        setSearchParams(getQueries(searchParams, ["isActive"]));
        break;
      }

      case "activeUsers": {
        searchParams.set("page", 1);
        searchParams.set("isActive", true);
        setSearchParams(searchParams);
        break;
      }
      case "inactiveUsers": {
        searchParams.set("page", 1);
        searchParams.set("isActive", false);
        setSearchParams(searchParams);
        break;
      }
    }
  };
  const searchInputWrapper = () => {
    let timerId;

    return (evt) => {
      clearTimeout(timerId);

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

  const onSearchInputChange = searchInputWrapper();

  const label = {
    placeholder: "Search for user",
    sx: { width: 300 },
    onChange: onSearchInputChange,
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <Input {...label} />

        <AddUser />
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <MainRadioButtons
          labels={["All users", "Active users", "Inactive Users"]}
          values={["allUsers", "activeUsers", "inactiveUsers"]}
          handleChange={handleChange}
          defaultValue="allUsers"
        />
      </div>
    </>
  );
}

export default UsersListHeader;
