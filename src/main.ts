import { downloadRepositoryContents } from './githubGrab'
import { log } from './loger'
import path from 'path';

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'evan-gan.github.io';
const destination = path.join(scriptDirectory, '/../public');

log("Started script!")
downloadRepositoryContents(owner, repo, destination);
console.log("THIS IS NOT THE MAIN RUN FILE, RUN SERVER.TS FOR UPDATING SERVER")

//TODO: Should make api write new stuff to a secondary file and then switch requests over to there for zero downtime.