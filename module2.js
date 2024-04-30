import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mergepdfs as merge } from './hjbm.js'; // Assuming hjbm.js is in the same directory

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('uploads'))
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'main.html')); // Using join for path concatenation
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    try {
        await merge(req.files[0].path, req.files[1].path);
        res.redirect(`static/merged.pdf`);
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});
