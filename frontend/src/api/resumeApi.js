import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function uploadResume(file) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await API.post(
        "/upload-resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}