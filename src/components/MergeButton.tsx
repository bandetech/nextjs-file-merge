import React, { useState } from 'react';
import { mergeFiles } from '../utils/api';

interface MergeButtonProps {
    fileIds: string[];
    onMergeSuccess: (fileName: string) => void;
    onMergeError: (error: any) => void;
}

const MergeButton: React.FC<MergeButtonProps> = ({ fileIds, onMergeSuccess, onMergeError }) => {
    const [isMerging, setIsMerging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMerge = async () => {
        setIsMerging(true);
        setError(null);

        try {
            const response = await mergeFiles(fileIds);
            onMergeSuccess(response);
        } catch (err) {
            setError('Failed to merge files');
            onMergeError(err);
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <div>
            <button onClick={handleMerge} disabled={isMerging || fileIds.length === 0}>
                {isMerging ? 'Merging...' : 'Merge Files'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MergeButton;