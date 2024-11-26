import apiClient from "../plugins/axios";

export async function getData(url) {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error en la peticion get:", error);
    throw error;
  }
}

export async function postData(url, data) {
  try {
    console.log(data);
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error en la peticion post:", error);
    throw error;
  }
}

export async function putData(url, data) {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error en la peticion put:", error);
    throw error;
  }
}
