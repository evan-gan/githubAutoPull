import express from 'express'
import path from 'path'
// import fs from 'fs'
import fs from 'fs-extra'
import { log, logError, logWarn } from './loger'
import { downloadRepositoryContents } from './githubGrab'
import dotenv from "dotenv";
dotenv.config();

const app = express()
const port = 25565

//
const countFilePath = path.join(__dirname, 'count.txt')
let count = parseInt(await fs.readFile(countFilePath, 'utf-8'), 10)

async function initialize() {
    try {
        count = parseInt(await fs.readFile(countFilePath, 'utf-8'), 10)
    } catch (error) {
        logError(`Failed to read count file:`, error.message)
    }
}

initialize();

let baseDirectory = path.join(__dirname, '..')
let publicDirectory = path.join(baseDirectory, `public${count}`)

app.use(express.json())

app.post('/webhook', (req, res) => {
    // Placeholder for GitHub webhook stuff
    log('Received webhook:\n' + JSON.stringify(req.body))
    // res.sendStatus(200)
    res.status(200).send("Receved trigger!")
    liveUpdate()
})

app.get('*', (request, response) => {
    const requestedPath = path.join(publicDirectory, request.path)
    const normalizedPath = path.normalize(requestedPath)

    if (!normalizedPath.startsWith(publicDirectory)) {
        logWarn(`A user attempted to access forbidden files. They tried to access "${request.path}" which was normalised to "${normalizedPath}"`)
        return response.status(403).send('Good try! The files you are trying to access are forbidden!')
    }

    fs.stat(normalizedPath, (err, stats) => {
        if (err || !stats.isFile()) {
            logWarn(`A user attempted to access files that do not exist. They tried to access "${request.path}" which was normalised to "${normalizedPath}"`)
            return response.status(404).send('Not Found')
        }
        log(`A user accessed ${request.path}" which was normalised to "${normalizedPath}"`)
        response.sendFile(normalizedPath)
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

//TODO: Finish
async function liveUpdate() {
    log("Stating a live update!")
    await incrementCounter()
    let newPublicDirectory = path.join(baseDirectory, `public${count}`)
    //@ts-ignore - Yeah, it's hacky!
    await downloadRepositoryContents(process.env.REPO_OWNER, process.env.REPO_NAME ?? "", newPublicDirectory)
    
    publicDirectory = newPublicDirectory
    log("Live update done!")
}

// import { promises as fs } from 'fs';

async function incrementCounter() {
    const number = await parseInt(await fs.readFile(countFilePath, 'utf-8'), 10)
    await fs.writeFile(countFilePath, (number + 1).toString())
    count += 1
    log("Updated pull count")
}
