const baseUrl = "http://localhost:3000/seller";
import { toast } from "react-toastify";
const token = localStorage.getItem("sToken");
export const fetchProfile = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/myProfile`, {
      method: "get",
      headers: {
        Authorization: token,
      },
    });
    const responseData = await response.json();
    if (responseData.ackbool == 0) {
      toast.error(responseData.message);
      return responseData;
    } else {
      toast.success(responseData.message);
      return responseData;
    }
  } catch (error) {
    toast.error("Failed to Save");
    throw error;
  }
};
