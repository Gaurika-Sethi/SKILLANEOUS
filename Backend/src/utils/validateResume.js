const validateResumeForGeneration = (resumeData) => {
    if (!resumeData.summary) {
    throw new Error("Summary is required");
    }

    const hasExperience =
    resumeData.experience?.length > 0;

    const hasProjects =
    resumeData.projects?.length > 0;

    if (!hasExperience && !hasProjects) {
    throw new Error(
        "Add at least one experience or project"
    );
    }

    if (
        template_type === "creative" &&
        !resumeData.personal_info?.photo_url
    ) {
        throw new Error(
            "Profile photo is required for the Modern template"
        );
    }
};

export {validateResumeForGeneration};