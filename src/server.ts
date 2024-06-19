import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { downloadRepositoryContents } from './githubGrab'
import { log, logError } from './loger'

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'trail-PCB-communication-network';
const destination = scriptDirectory+'/../github-repo';


const app = express();
const port = 3000;
let publicDirectory = path.join(__dirname, 'public');

const serveDirectory = (dir: string) => {
    app.use(express.static(dir));
    // app.use('/preview', express.static(path.join(__dirname, 'public')))
    publicDirectory = dir;
};

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    log('Received webhook:\n' + req.body);
    downloadRepositoryContents(owner, repo, destination);
    res.sendStatus(200);
});

app.listen(port, () => {
    log(`Server is listening on port ${port}`);
    serveDirectory(publicDirectory);
});

// Export serveDirectory for external use
export { serveDirectory };
