

const buildRoadmapPrompt = ({
    targetField,
    primaryPurpose,
    skills,
    specificFocus,
}) => {
    return `
    You are an expert curriculum designer.

    Generate a detailed learning roadmap in MARKDOWN ONLY.
    
    Rules:
    - Output ONLY markdown
    - No explanations
    - No extra text
    - Use this hierarchy strictly:
        # Roadmap Title
        ## Phase
        ### Topic
        - Subtopic

    Target Field: ${targetField}
    User Goal:
    Primary Purpose: ${primaryPurpose}
    Specific Focus: ${specificFocus || "None"}

    Current Skills:
    ${skills 
        .map(
            (s) =>
                `- ${s.name} (${s.level}, ${s.years} years)`
        )
        .join("\n")}

    Design the roadmap progressively from fundamentals to advanced.`;
};

export { buildRoadmapPrompt };