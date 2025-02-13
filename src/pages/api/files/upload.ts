import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser to handle multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse files' });
      }

      const file = files.file[0]; // Assuming single file upload
      const fileId = generateUniqueId(); // Function to generate a unique ID for the file
      const uploadPath = path.join(process.cwd(), 'uploads', fileId + path.extname(file.originalFilename));

      try {
        await fs.promises.rename(file.filepath, uploadPath);
        return res.status(200).json({ id: fileId });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to save file' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}