const getProjectId = (projects, projectToObtain) => {
  for (const project of projects) {
    if (project.name.toUpperCase() === projectToObtain.toUpperCase()) {
      return (project.id)
    }
  }
  throw new Error('Project name does not match any projects in your todoist account')
}

export default getProjectId;