import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'
import { log, logError } from './loger'

const scriptDirectory = __dirname

interface GitHubContent {
    type: string
    path: string
    download_url: string
}

export async function downloadRepositoryContents(owner: string, repo: string, destination: string): Promise<void> {
    log("Started download")
    await downloadDirectory(owner, repo, '', destination)
    log('Download complete')
}

async function downloadDirectory(owner: string, repo: string, dirPath: string, destination: string): Promise<void> {
    try {
        const dirUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`
        const response = await axios.get<GitHubContent[]>(dirUrl, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        })

        const contents = response.data

        for (const item of contents) {
            const itemPath = path.join(destination, item.path)
            if (item.type === 'file') {
                await downloadFile(item.download_url, itemPath)
            } else if (item.type === 'dir') {
                await downloadDirectory(owner, repo, item.path, destination)
            }
        }
    } catch (error) {
        logError(`Error downloading directory ${dirPath}:`, error)
    }
}

async function downloadFile(fileUrl: string, filePath: string): Promise<void> {
    try {
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' })
        //If directory does not exist, create it
        await fs.ensureDir(path.dirname(filePath))
        //Write the file to the directory
        await fs.writeFile(filePath, response.data)
        log(`Downloaded file: ${filePath}`)
    } catch (error) {
        logError(`Error downloading file ${filePath}:`, error)
    }
}