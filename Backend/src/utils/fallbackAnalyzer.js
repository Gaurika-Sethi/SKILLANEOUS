const fallbackAnalysis = (resumeText, jobDescription) => {

 const resume = resumeText.toLowerCase();
 const jdWords = jobDescription.toLowerCase().split(/\W+/);

 const uniqueKeywords = [...new Set(jdWords)].filter(word => word.length > 4);

 const missingKeywords = uniqueKeywords.filter(word => !resume.includes(word));

 const atsScore = Math.max(30, 100 - missingKeywords.length * 2);

 return {
  atsScore,
  missingKeywords: missingKeywords.slice(0, 5),
  suggestions: [
   "Add more relevant keywords from the job description",
   "Improve alignment with required skills",
   "Include measurable achievements"
  ]
 };
};

export { fallbackAnalysis };