import { BASE_URL } from "../../constants";

export const fetchUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}users/registration`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
