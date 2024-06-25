import express from 'express';
import path from 'path';
import fs from 'fs';
import { log, logError, logWarn } from './loger'

const app = express();
const port = 25565;
let publicDirectory = path.join(__dirname, 'public');

const serveDirectory = (dir: string) => {
    publicDirectory = path.join(__dirname, dir);
};

app.use(express.json());

app.post('/webhook', (req, res) => {
    // Placeholder for GitHub webhook stuff
    log('Received webhook:\n' + req.body);
    // res.sendStatus(200);
    res.status(200).send("Trigger sucsessfull!")
});

app.get('*', (request, response) => {
    const requestedPath = path.join(publicDirectory, request.path);
    const normalizedPath = path.normalize(requestedPath);

    if (!normalizedPath.startsWith(publicDirectory)) {
        logWarn(`A user attempted to access forbidden files. They tried to access "${request.path}" which was normalised to "${normalizedPath}"`)
        return response.status(403).send('Good try! The files you are trying to access are forbidden!');
    }

    fs.stat(normalizedPath, (err, stats) => {
        if (err || !stats.isFile()) {
            logWarn(`A user attempted to access files that do not exist. They tried to access "${request.path}" which was normalised to "${normalizedPath}"`)
            return response.status(404).send('Not Found');
        }
        response.sendFile(normalizedPath);
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    serveDirectory(publicDirectory);
});

export { serveDirectory };