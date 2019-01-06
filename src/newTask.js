const fetch = require("node-fetch");

const newTask = async (apiToken, createNewTaskURL, content, dueDate, projectId) => {
  return await fetch(createNewTaskURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    },
    body: JSON.stringify({"content": content, "due_date": dueDate, "due_lang": "en", "priority": 4, 'project_id': projectId})
  })
}

export default newTask;