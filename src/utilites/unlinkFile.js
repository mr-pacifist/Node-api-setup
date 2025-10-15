
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { ApiError } from './ApiError.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const unlinkFile = (filePath) => {
    
    fs.unlinkSync(join(__dirname, "../../", filePath), (err) => {
        if (err) {
            throw new ApiError(500,"Unable to delete file")
        }
    });
};

export {unlinkFile}