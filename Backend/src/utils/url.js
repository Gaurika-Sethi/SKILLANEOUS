const normalizeHttpUrl = (value = "") => {
    const url = String(value || "").trim();
    if (!url) return "";

    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url)) {
        return url;
    }

    if (url.startsWith("//")) {
        return `https:${url}`;
    }

    return `https://${url}`;
};

const normalizeLinkEntries = (links = []) => {
    if (!Array.isArray(links)) return [];

    return links.map((link) => ({
        label: link?.label || "",
        url: normalizeHttpUrl(link?.url || ""),
    }));
};

const normalizeProjectLinkEntries = (links = []) => {
    if (!Array.isArray(links)) return [];

    return links.map((link) => ({
        type: link?.type || "other",
        url: normalizeHttpUrl(link?.url || ""),
    }));
};

export { normalizeHttpUrl, normalizeLinkEntries, normalizeProjectLinkEntries };
