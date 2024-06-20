import { downloadRepositoryContents } from './githubGrab'
import path from 'path';

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'trail-PCB-communication-network';
const destination = path.join(scriptDirectory, '/../github-repo');

console.log("Started script!")
// downloadRepositoryContents(owner, repo, destination);

//TODO: Should make api write new stuff to a secondary file and then switch requests over to there for zero downtime.