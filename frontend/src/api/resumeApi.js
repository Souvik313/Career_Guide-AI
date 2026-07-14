import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
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