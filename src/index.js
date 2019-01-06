import 'dotenv/config';
import newTask from './newTask';
import fs from 'fs';
import csvParser from 'csv-parser';
import getProjects from './getProjects'
import getProjectId from './getProjectId'

const { API_TOKEN, CREATE_NEW_TASK_URL, GET_PROJECTS_URL, INPUT_FILE_PATH, PROJECT } = process.env;

const delay = ms => new Promise(res => setTimeout(res, ms));

const main = async () => {
  try {
    const projects = await getProjects(API_TOKEN, GET_PROJECTS_URL);
    const projectId = getProjectId(projects, PROJECT);
    const results = []
    await fs.createReadStream(INPUT_FILE_PATH)
      .pipe(csvParser({ separator: ',' }))
      .on('data', data => {
        results.push(data);
      })
      .on('end', async () => {
        const errors = [];
        for (let result of results) {
            await delay(2000);
            const response = await newTask(API_TOKEN, CREATE_NEW_TASK_URL, result.Content, result.Date, projectId)
            if (response.status > 400) {
              errors.push(result.Content)
            }
            console.log(response.status)
        }
        if (errors) {
          console.log('Some tasks failed to be created, these were:')
          for (const error of errors) {
            console.log(error);
          }
        }
      })


  } catch (e) {
    console.log(e)
  }



};

main();