import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/files';

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        interface UploadResponse {
            id: string;
        }
        const response = await axios.post<UploadResponse>(`${API_BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.id;
    } catch (error) {
        if ((error as any).isAxiosError) {
            const axiosError = error as any;
            throw new Error('File upload failed: ' + axiosError.response?.data?.error || axiosError.message);
        } else {
            throw new Error('File upload failed: ' + (error as any).message);
        }
    }
};

export const mergeFiles = async (fileIds: string[]): Promise<string> => {
    try {
        interface MergeResponse {
            outputFile: string;
        }
        const response = await axios.post<MergeResponse>(`${API_BASE_URL}/merge`, fileIds.map(id => ({ id })));
        return response.data.outputFile;
    } catch (error) {
        const axiosError = error as any;
        throw new Error('File merge failed: ' + axiosError.response?.data?.error || axiosError.message);
    }
};

export const downloadFile = (fileName: string): void => {
    window.open(`${API_BASE_URL}/getPdf/${fileName}`, '_blank');
};