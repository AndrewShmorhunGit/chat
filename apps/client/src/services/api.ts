import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUser = async (): Promise<any> => {
  const response = await axios.get(`${API_URL}/users`);
  console.log(response.data);

  return response.data;
};
