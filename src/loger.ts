import fs from 'fs-extra';
// import path from 'path';
//Date utilitys
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const scriptDirectory = __dirname;

function currentDate(): string { 
    //Get current date and time
    const now = new Date();

    //Apply custom format
    const customFormat = `M/d/yyyy ' - ' h:mm:ss a 'EST'`;

    //Format the current date and time
    const formattedDate = format(now, customFormat, { locale: enUS });

    // console.log("Got date: " + formattedDate)

    return formattedDate
}

export async function logError(message: string, errorJSON: any) {
    const logMessage = 'ERROR | ' + currentDate() + ' | ' + message + '\n' + JSON.stringify(errorJSON)
    const logFilePath = scriptDirectory + '../log.txt'

    try {
        await fs.appendFile(logFilePath, '\n' + logMessage);
        console.log(logMessage);
    } catch (err) {
        console.error('Failed to write error to log file:', err);
    }
}

export async function log(message: string) {
    const logMessage = 'GOOD  | ' + currentDate() + ' | ' + message
    const logFilePath = scriptDirectory + '/../log.txt'

    try {
        await fs.appendFile(logFilePath, '\n' + logMessage);
        console.log(logMessage);
    } catch (err) {
        console.error('Failed to write to log file:', err);
    }
}

