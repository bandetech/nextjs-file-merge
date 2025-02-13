import React from 'react';

interface DownloadButtonProps {
    fileName: string | null;
    onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileName, onDownload }) => {
    return (
        <>
            {fileName && (
                <button onClick={onDownload}>
                    Download Merged File
                </button>
            )}
        </>
    );
};

export default DownloadButton;