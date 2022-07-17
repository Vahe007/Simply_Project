import { BASE_URL } from "../../../constants";

export const fetchUser = async (data, endPoint) => {
  try {
    const response = await fetch(`${BASE_URL}users/${endPoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
  }
};
