const normalizeResumeData = (resumeData = {}) => {
    return {
    ...resumeData,

    summary: resumeData.summary?.trim() || "",

    personalInfo: {
        ...resumeData.personalInfo,
        fullName: resumeData.personalInfo?.fullName?.trim() || "",
        email: resumeData.personalInfo?.email?.trim() || "",
        phone: resumeData.personalInfo?.phone?.trim() || "",
        location: resumeData.personalInfo?.location?.trim() || "",
        photoUrl: resumeData.personalInfo?.photoUrl || "",
        links: (resumeData.personalInfo?.links || []).filter(
        (l) => l?.url
        ),
    },

    parsedSkills: resumeData.parsedSkills || [],

    experience: (resumeData.experience || [])
        .filter((e) => e.role && e.company)
        .map((e) => ({
        ...e,
        description: (e.description || []).filter(Boolean),
        })),

    projects: (resumeData.projects || [])
        .filter((p) => p.title)
        .map((p) => ({
        ...p,
        description: (p.description || []).filter(Boolean),
        links: (p.links || []).filter((l) => l?.url),
        })),

    education: {
        institution: resumeData.education?.institution?.trim() || "",
        degree: resumeData.education?.degree?.trim() || "",
        location: resumeData.education?.location?.trim() || "",
        graduationYear: resumeData.education?.graduationYear?.trim() || "",
    },
    achievements: resumeData.achievements || [],
    };
};

export {normalizeResumeData};