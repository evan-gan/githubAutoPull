import express from 'express'
import path from 'path'
import fs from 'fs-extra'
import { log, logError, logWarn } from './loger'
import { downloadRepositoryContents } from './githubGrab'
// import dotenv from "dotenv";
// dotenv.config();

const REPO_OWNER = 'evan-gan'
const REPO_NAME = 'evan-gan.github.io'
const app = express()
const port = 25565

//
const countFilePath = path.join(__dirname, 'count.txt')
let count = 0

async function initialize() {
    try {
        count = parseInt(await fs.readFile(countFilePath, 'utf-8'), 10)
    } catch (error) {
        logError(`Failed to read count file:`, (error as Error).message)
    }
}

initialize();

let baseDirectory = path.join(__dirname, '../publicContainer')
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



//TODO: Finish
async function liveUpdate() {
    log("Stating a live update!")
    await incrementCounter()
    let newPublicDirectory = path.join(baseDirectory, `public${count}`)
    //Test
    await downloadRepositoryContents(REPO_OWNER, REPO_NAME, newPublicDirectory)
    
    publicDirectory = newPublicDirectory

    await cleanUpOldFiles()
    log("Live update done!")
}

async function cleanUpOldFiles() {
    log("Starting to clean up old files")
    try {
        const files = await fs.readdir(baseDirectory);
        for (const file of files) {
            const filePath = path.join(baseDirectory, file);
            if (filePath != publicDirectory) {
                log(`Deleting old public directory: ${file}`)
                await deleteDirectory(filePath);
            } 
        }
    } catch (err) {
        logError(`Error while looking for directory's to delete:`,err);
    }
    log("Done cleaning up old files!")
}

async function deleteDirectory(directoryPath: string) {
    try {
        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                await deleteDirectory(filePath);
            } else {
                await fs.unlink(filePath);
            }
        }
        await fs.rmdir(directoryPath);
        log(`Deleted directory: ${directoryPath}`);
    } catch (err) {
        logError(`Error while deleting directory:`,err);
    }
}

// import { promises as fs } from 'fs';

async function incrementCounter() {
    const number = await parseInt(await fs.readFile(countFilePath, 'utf-8'), 10)
    await fs.writeFile(countFilePath, (number + 1).toString())
    count += 1
    log("Updated pull count")
}

//Setup directory
try {
    const files = await fs.readdir(baseDirectory);
    if (files.length == 0) { 
        log("No public directory was found, downloading it now")
        liveUpdate()
    }
} catch (err) {
    logError(`Error while looking for directory's to delete:`,err);
}

app.listen(port, () => {
    initialize()
    console.log(`Server is listening on port ${port}`)
})