import { downloadRepositoryContents } from './githubGrab'

const scriptDirectory = __dirname;

const owner = 'evan-gan';
const repo = 'trail-PCB-communication-network';
const destination = scriptDirectory+'/../github-repo';

console.log("Started...")
downloadRepositoryContents(owner, repo, destination);

//TODO: Should make api write new stuff to a secondary file and then switch requests over to there for zero downtime.

// _____ _ _      _    _           _ _  ___                                           
// / ____| (_)    | |  | |         (_) ||__ \                                          
// | |    | |_  ___| | _| |__   __ _ _| |_  ) |                                         
// | |    | | |/ __| |/ / '_ \ / _` | | __|/ /                                          
// | |____| | | (__|   <| |_) | (_| | | |_|_|                                           
// \_____|_|_|\___|_|\_\_.__/ \__,_|_|\__(_)                                     _   _ 
// | |                                                                           | | | |
// | |     ___  __ ___   _____    __ _    ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_| |
// | |    / _ \/ _` \ \ / / _ \  / _` |  / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __| |
// | |___|  __/ (_| |\ V /  __/ | (_| | | (_| (_) | | | | | | | | | | |  __/ | | | |_|_|
// |______\___|\__,_| \_/ \___|  \__,_|  \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__(_)
                                                                                    
                                                                                    