import axios from "axios";
import { toast } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function post<T, R>(path: string, body: T): Promise<R | void> {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post<R>(`${backendUrl}/${path}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                toast.error(error.response.data.message || "Erro desconhecido");
            } else {
                toast.error("Erro de conexão");
            }
        } else {
            toast.error("Erro inesperado");
        }
    }
}

export async function get<T, R>(path: string, params?: T): Promise<R | void> {
    try {
        const response = await axios.get<R>(`${backendUrl}/${path}`, { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                toast.error(error.response.data.message || "Erro desconhecido");
            } else {
                toast.error("Erro de conexão");
            }
        } else {
            toast.error("Erro inesperado");
        }
    }
}


export async function del<T, R>(path: string, body: T): Promise<R | void> {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.delete<R>(`${backendUrl}/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: body
        });
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                toast.error(error.response.data.message || "Erro desconhecido");
            } else {
                toast.error("Erro de conexão");
            }
        } else {
            toast.error("Erro inesperado");
        }
    }
}