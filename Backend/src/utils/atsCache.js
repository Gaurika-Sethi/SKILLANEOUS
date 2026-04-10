const parameterCache = new Map();

const getCacheKey = (targetRole, jobDescription) => {
 return `${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}`;
};

const getCachedParameters = (key) => {
 return parameterCache.get(key);
};

const setCachedParameters = (key, value) => {
 parameterCache.set(key, value);
};

// 🔥 NEW: Evaluation Cache (resume + job)

const evaluationCache = new Map();

const getEvaluationCacheKey = (resumeText, targetRole, jobDescription) => {
  const shortResume = resumeText.slice(0, 1000); // avoid huge keys
  return `${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}::${shortResume.toLowerCase()}`;
};

const getCachedEvaluation = (key) => {
  return evaluationCache.get(key);
};

const setCachedEvaluation = (key, value) => {
  evaluationCache.set(key, value);
};

export {
  getCacheKey,
  getCachedParameters,
  setCachedParameters,
  getEvaluationCacheKey,
  getCachedEvaluation,
  setCachedEvaluation
};