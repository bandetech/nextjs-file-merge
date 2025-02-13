import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const fileIds = req.body;

            // Here you would implement the logic to merge files based on the provided IDs.
            // This is a placeholder for the actual merging logic.
            const mergedFileName = 'merged.pdf'; // Example output file name

            // Respond with the name of the merged file
            res.status(200).json({ outputFile: mergedFileName });
        } catch (error) {
            res.status(500).json({ error: 'Failed to merge files' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}