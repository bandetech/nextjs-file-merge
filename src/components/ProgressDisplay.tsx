import React from 'react';

interface ProgressDisplayProps {
    progress: number;
    uploadProgress: number;
    mergeProgress: number;
    uploadError: string | null;
    mergeError: string | null;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
    uploadProgress,
    mergeProgress,
    uploadError,
    mergeError,
}) => {
    return (
        <div>
            <div>
                <h3>Upload Progress: {uploadProgress}%</h3>
                {uploadError && <p style={{ color: 'red' }}>Error: {uploadError}</p>}
            </div>
            <div>
                <h3>Merge Progress: {mergeProgress}%</h3>
                {mergeError && <p style={{ color: 'red' }}>Error: {mergeError}</p>}
            </div>
        </div>
    );
};

export default ProgressDisplay;