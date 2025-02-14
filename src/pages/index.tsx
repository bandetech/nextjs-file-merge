import { useState } from 'react';
import FileUploadAndMerge from '../components/FileUploadAndMerge';
import DownloadButton from '../components/DownloadButton';
import { downloadFile } from '@/utils/api';

const Home = () => {
    const [mergedFileName, setMergedFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleMergeComplete = (fileName: string) => {
        setMergedFileName(fileName);
    };

    const handleDownload = () => {
        if (mergedFileName) {
            downloadFile(mergedFileName);
        }
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    return (
        <div>
            <h1>ファイルの結合</h1>
            <FileUploadAndMerge onFileMerged={handleMergeComplete} onError={handleError} />
            {mergedFileName && <DownloadButton fileName={mergedFileName} onDownload={handleDownload}/>}
        </div>
    );
};

export default Home;