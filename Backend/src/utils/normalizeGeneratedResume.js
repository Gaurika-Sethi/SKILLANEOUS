

const normalizeGeneratedResumeContent = (ai) => {
    const p = ai.personalInfo || ai.PersonalInfo || {};

    return {
        personalInfo: {
            full_name: p.fullName || p.full_name || "",
            email: p.email || "",
            phone: p.phone || "",
            location: p.location || "",
            photoUrl: p.photoUrl || "",
            links: (p.links || []).map((l) => ({
                label: l.label || "",
                url: l.url || "",
            })),
        },

    generatedContent: ai.summary || "",

    parsedSkills: ai.parsedSkills || ai.skills || [],

    experience: (ai.experience || []).map((e) => ({
        role: e.role || "",
        company: e.company || "",
        start_date: e.startDate || e.start_date || "",
        end_date: e.endDate || e.end_date || "",
        description: e.description || e.bullets || [],
        location: e.location || "",
    })),

    projects: (ai.projects || []).map((p) => ({
        title: p.title || "",
        tech_stack: p.techStack || p.tech_stack || [],
        duration: p.duration || "",
        description: p.description || p.bullets || [],
        links: (p.links || []).map((l) => ({
            type: l.type || "other",
            url: l.url || "",
        })),
    })),

    education: {
        degree: ai.education?.degree || "",
        institution: ai.education?.institution || "",
        location: ai.education?.location || "",
        graduation_year: ai.education?.graduationYear || ai.education?.graduation_year || "",
    },

    achievements: ai.achievements || [],
};
};

export { normalizeGeneratedResumeContent };