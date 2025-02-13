import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import MergeButton from '../components/MergeButton';
import DownloadButton from '../components/DownloadButton';
import ProgressDisplay from '../components/ProgressDisplay';

const Home = () => {
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
    const [mergedFileName, setMergedFileName] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [mergeProgress, setMergeProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);


    const handleFileUpload = (fileIds: string[]) => {
        setUploadedFileIds(fileIds);
    };

    const handleMergeComplete = (fileName: string) => {
        setMergedFileName(fileName);
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const handleMergeProgress = (progress: number) => {
        setMergeProgress(progress);
    };

    const handleDownload = () => {
        if (mergedFileName) {
            window.open(`http://localhost:8080/api/files/getPdf/${mergedFileName}`, '_blank');
        }
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    return (
        <div>
            <h1>File Upload and Merge</h1>
            <FileUpload onFileUpload={handleFileUpload} onError={handleError} />
            <MergeButton fileIds={uploadedFileIds} onMergeSuccess={handleMergeComplete} onMergeError={handleError} />
            {mergedFileName && <DownloadButton fileName={mergedFileName} onDownload={handleDownload}/>}
        </div>
    );
};

export default Home;