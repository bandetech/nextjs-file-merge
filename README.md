# Nextjs File Merger

This project is a React Next.js application that allows users to upload multiple files, merge them into a single file, and download the merged file. The application provides a user-friendly interface for file uploads and displays progress and error messages throughout the process.

## Features

- Drag and drop multiple file uploads.
- Merge uploaded files into a single file.
- Download the merged file once it is ready.
- Asynchronous operations for file upload, merging, and downloading.
- Progress indicators for uploads and merges.
- Error handling for file operations.

## Project Structure

```
extjs-file-merge
├── public
├── src
│   ├── components
│   │   ├── FileUpload.tsx
│   │   ├── MergeButton.tsx
│   │   ├── DownloadButton.tsx
│   │   └── ProgressDisplay.tsx
│   ├── pages
│   │   ├── api
│   │   │   ├── files
│   │   │   │   ├── upload.ts
│   │   │   │   ├── merge.ts
│   │   │   │   └── getPdf.ts
│   │   └── index.tsx
│   ├── styles
│   │   └── Home.module.css
│   └── utils
│       └── api.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-file-merge
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Drag and drop files into the designated area to upload them.
- Click the "Merge" button to combine the uploaded files into one.
- Once the merge is complete, a download button will appear to download the merged file.

## API Endpoints

- **Upload File**: `POST http://localhost:8080/api/files/upload`
- **Merge Files**: `POST http://localhost:8080/api/files/merge`
- **Download Merged File**: `GET http://localhost:8080/api/files/getPdf/{fileName}`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.