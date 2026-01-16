

const sanitizeGeneratedProject = (data, wantsGithub) => {
  const clean = { ...data };

  const forceArray = (k) => {
    if (!Array.isArray(clean[k])) clean[k] = [];
  };

  forceArray("features");
  forceArray("folderStructure");
  forceArray("deploymentChecklist");
  forceArray("resumeBullets");

  clean.features = clean.features.slice(0, 6);
  clean.folderStructure = clean.folderStructure.slice(0, 12);
  clean.deploymentChecklist = clean.deploymentChecklist.slice(0, 6);
  clean.resumeBullets = clean.resumeBullets.slice(0, 3);

  clean.folderStructure = clean.folderStructure.map((p) =>
    p.replace("src/middleware/", "src/middlewares/")
  );

  if (!wantsGithub) delete clean.githubReadmeTemplate;

  return clean;
};

export { sanitizeGeneratedProject };