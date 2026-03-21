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

export { getCacheKey, getCachedParameters, setCachedParameters };