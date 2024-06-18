import { downloadRepositoryContents } from './githubGrab'

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'trail-PCB-communication-network';
const destination = scriptDirectory+'/../github-repo';

console.log("Started...")
downloadRepositoryContents(owner, repo, destination);

//TODO: Should make api write new stuff to a secondary file and then switch requests over to there for zero downtime.