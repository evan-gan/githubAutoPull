import { downloadRepositoryContents } from './githubGrab'
import { log } from './loger'
import path from 'path';

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'evan-gan.github.io';
const destination = path.join(scriptDirectory, '/../github-repo');

log("Started script!")
downloadRepositoryContents(owner, repo, destination);

//TODO: Should make api write new stuff to a secondary file and then switch requests over to there for zero downtime.