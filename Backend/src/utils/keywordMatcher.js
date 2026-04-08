const matchKeywords = (resumeText, parameters) => {

 const text = resumeText.toLowerCase();

 const allSkills = [
  ...(parameters.requiredSkills || []),
  ...(parameters.optionalSkills || [])
 ];

 const matchedKeywords = [];
 const missingKeywords = [];

 allSkills.forEach(skill => {
  if (text.includes(skill.toLowerCase())) {
   matchedKeywords.push(skill);
  } else {
   missingKeywords.push(skill);
  }
 });

 return { matchedKeywords, missingKeywords };
};

export { matchKeywords };