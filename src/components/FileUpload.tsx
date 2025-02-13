import React, { useState } from 'react';

interface FileUploadProps {
    onFileUpload: (fileIds: string[]) => void;
    onError: (errorMessage: string) => void;
}   

const FileUpload:React.FC<FileUploadProps> = ({ onFileUpload, onError }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            setFiles(Array.from(event.dataTransfer.files));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const uploadFiles = async () => {
        setError(null);
        const fileIDs: string[] = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                fileIDs.push(data.id);

                console.log('Uploaded file ID:', data.id);
            } catch (err) {
                onError('ファイルのアップロードに失敗しました');
            }
        }
        onFileUpload(fileIDs);
    };

    return (
        <div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px' }}
            >
                <p>Drag and drop files here or click to select files</p>
                <input type="file" multiple onChange={handleFileChange} />
            </div>
            <button onClick={uploadFiles}>Upload Files</button>
           
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default FileUpload;