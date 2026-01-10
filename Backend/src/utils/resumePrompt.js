

const buildResumeGenerationPrompt = ({
    resumeData,
    templateType,
    tone,
    targetRole,
}) => {
    const {
        personalInfo,
        summary,
        parsedSkills,
        experience,
        projects,
        education,
        achievements,
    } = resumeData;
    
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
            (e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.startDate} - ${e.endDate})
            Bullets: ${(e.description || []).join(" | ")}`
        )
        .join("\n")
        : "None"
    }

    Projects:
    ${
        projects?.length
        ? projects
        .map(
            (p, i) => `${i + 1}. ${p.title}
            Tech Stack: ${(p.techStack || []).join(", ")}
            Duration: ${p.duration || ""}
            Bullets: ${(p.description || []).join(" | ")}
            Links: ${
                p.links?.length
                ? p.links.map((l) => `${l.type}: ${l.url}`).join(", ")
                : "None"
            }`
        )
        .join("\n")
        : "None"
    }

    Education:
    Institution: ${education?.institution || ""}
    Degree: ${education?.degree || ""}
    Location: ${education?.location || ""}
    Graduation Year: ${education?.graduationYear || ""}
    
    Achievements:
    ${achievements?.length ? achievements.join(" | ") : "None"}
    
    OUTPUT JSON FORMAT (must follow exactly):
    {
    "headline": "",
    "summary": "",
    "skills": [],
    "experience": [
    {
    "role": "",
    "company": "",
    "startDate": "",
    "endDate": "",
    "bullets": []
    }
    ],
    "projects": [
    {
    "title": "",
    "techStack": [],
    "bullets": [],
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