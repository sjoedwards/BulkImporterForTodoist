const fetch = require("node-fetch");

const getProjects = async (apiToken, projectsUrl) => {
  const response = await fetch(projectsUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`
    },
  })
  return await response.json();
};

export default getProjects;
