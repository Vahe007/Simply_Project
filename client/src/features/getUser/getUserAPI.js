import { BASE_URL } from "../../constants.js";

export const fetchUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();

  } catch (error) {
    return error;
  }
};
