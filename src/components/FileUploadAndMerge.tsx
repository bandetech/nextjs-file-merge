import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile, mergeFiles } from '@/utils/api';
import styles from '@/styles/Home.module.css';  

interface FileUploadProps {
    onFileMerged: (filename: string) => void;
    onError: (errorMessage: string) => void;
}   

const FileUploadAndMerge:React.FC<FileUploadProps> = ({ onFileMerged, onError }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const uploadFilesAndMerge = async () => {
        setError(null);
        const fileIDs: string[] = [];
        for (const file of files) {
            try {
                const fileId = await uploadFile(file); // Use the uploadFile function from api.ts
                fileIDs.push(fileId);

                console.log('Uploaded file ID:', fileId);
            } catch (err) {
                onError('ファイルのアップロードに失敗しました');
            }
        }

        const mergedFile = await mergeFiles(fileIDs);
        console.log('Merged file:',mergedFile);
        onFileMerged(mergedFile);
    };

    // 状態をリセットするハンドラ
    const handleReset = () => {
        setFiles([]);
        setError(null);
    }
    // アップロードされたファイルとその容量をリスト表示する
    const fileList = files.map((file, index) => (
        <li key={index}>{file.name} : {file.size /1000/1000} MB</li>
    ));

    return (
        <div>
            <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
                <input {...getInputProps()}  />
                {
                    isDragActive ?
                        <p>Drag & Drop ...</p> :
                        <p>ファイルをここにDrag & Dropするか、クリックしてファイルを選択してください。</p>
                }
            
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <ul>{fileList}</ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleReset} className={styles.resetButton}>リセット</button>
            </div>
            <button onClick={uploadFilesAndMerge} disabled={files.length == 0}>ファイルを結合</button>

        </div>
    );
};

export default FileUploadAndMerge;