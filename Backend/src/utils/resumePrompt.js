

const buildResumeGenerationPrompt = ({
    resumeData,
    templateType= "ats",
    tone= "professional",
    targetRole= "",
}) => {
    const {
        personalInfo= {},
        summary= "",
        parsedSkills= [],
        experience= [],
        projects= [],
        education= {},
        achievements= [],
    } = resumeData || {};

    const formatBullets = (arr = []) => {
    if (!arr.length) return "None";
    return arr.map((b) => `- ${b}`).join("\n");
    };
    
    return `
    You are an expert resume writer and ATS optimization assistant.
    
    GOAL:
    Generate a resume tailored for: ${targetRole || "the candidate's target role"}.

    STYLE SETTINGS:
    - Template type: ${templateType}
    - Tone: ${tone}
    
    STRICT RULES:
    - Do NOT invent experiences, projects, companies, education, or metrics.
    - You may improve wording and structure.
    - Make bullets strong using action verbs.
    - Keep each bullet max 1 line.
    - Output ONLY valid JSON. No markdown. No explanation.
    - Output MUST start with { and end with }.
    -All the fields in the Output should be camelCase.
    
    INPUT DATA:
    Personal Info:
    Name: ${personalInfo?.fullName || ""}
    Email: ${personalInfo?.email || ""}
    Phone: ${personalInfo?.phone || ""}
    Location: ${personalInfo?.location || ""}
    Links: ${
    personalInfo?.links?.length
    ? personalInfo.links.map((l) => `${l.label}: ${l.url}`).join(", ")
    : "None"
}

    Summary:
    ${summary || ""}
    
    Skills:
    ${parsedSkills?.length ? parsedSkills.join(", ") : "None"}

    Experience:
    ${
        experience?.length
        ? experience
        .map(
            (e, i) => `${i + 1} Role: ${e.role} at company: ${e.company} for duration: (${e.startDate} - ${e.endDate})
            Bullets: ${formatBullets(e.description || [])}`
            .trim()
        )
        .join("\n\n")
        : "None"
    }

    Projects:
    ${
        projects?.length
        ? projects
        .map(
            (p, i) => `${i + 1} title: ${p.title}
            Tech Stack: ${(p.techStack || []).join(", ")|| "None"}
            Duration: ${p.duration || "None"}
            Bullets: ${formatBullets(p.description || [])}
            Links: ${
                p.links?.length
                ? p.links.map((l) => `${l.type}: ${l.url}`).join(", ")
                : "None"
            }`
            .trim()
        )
        .join("\n\n")
        : "None"
    }

    Education:
    Institution: ${education?.institution || ""}
    Degree: ${education?.degree || ""}
    Location: ${education?.location || ""}
    Graduation Year: ${education?.graduationYear || ""}
    
    Achievements:
    ${achievements?.length ? formatBullets(achievements) : "None"}
    
    OUTPUT JSON FORMAT (must follow exactly):
    {
    "PersonalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "links": [{ "label": "", "url": "" }],
    },
    "summary": "",
    "skills": [],
    "experience": [
    {
    "role": "",
    "company": "",
    "startDate": "",
    "endDate": "",
    "description": []
    }
    ],
    "projects": [
    {
    "title": "",
    "techStack": [],
    "duration": "",
    "description": [],
    "links": [{ "type": "", "url": "" }]
    }
    ],
    "education": {
    "institution": "",
    "degree": "",
    "location": "",
    "graduationYear": ""
    },
    "achievements": []
    }`.trim();
};

export {buildResumeGenerationPrompt};