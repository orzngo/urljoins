
type QueryStringValue = string | null | undefined;
type QueryStringObject = { [key: string]: QueryStringValue | QueryStringValue[] };

export function urljoins(...parts: (string | QueryStringObject)[]): string {
    const strings: string[] = parts.map(p => {
        if (typeof p === "string") {
            return p;
        }
        const querys = Object.keys(p).map(k => {
            if (!Array.isArray(p[k])) {
                if (typeof p[k] === "string") {
                    return `${k}=${p[k]}`;
                } else {
                    return `${k}=`;
                }
            }
            return (p[k]as QueryStringValue[]).map((pk) =>{
                if (typeof pk === "string") {
                    return `${k}[]=${pk}`;
                } else {
                    return `${k}[]=`;
                }

            }).join("&");
        });
        return `?${querys.join("&")}`;
    });

    return urljoin(...strings);
}


export function urljoin(...parts: string[]): string {
    let result = "";
    let foundFirstParameter = false;

    parts.forEach((part, index, parts) => {
        if (foundFirstParameter) {
            if (hasTrailingAmpersand(result) || hasTrailingQuestion(result)) {
                if (hasHeadQuestion(part) || hasHeadAmpersand(part)) {
                    result += part.slice(1);
                } else {
                    result += part;
                }
            } else if (hasHeadQuestion(part)) {
                result += `&${part.slice(1)}`;
            } else if (hasTrailingAmpersand(result) && hasHeadAmpersand(part)) {
                result += part.slice(1);
            } else {
                result += `&${part}`;
            }
            return;
        }

        if (hasHeadQuestion(part) || hasTrailingQuestion(result) || hasTrailingAmpersand(result)) {
            if (result.slice(-1) === "?") {
                result += part.slice(1);
            } else if (hasQueryParameters(result)) {
                if (result.slice(-1) === "&") {
                    result += part.slice(1);
                } else {
                    result += `&${part.slice(1)}`;
                }
            } else {
                result += part;
            }
            foundFirstParameter = true;
            return;
        }

        const headSlashedPart = (hasHeadSlash(part)) ? part : `/${part}`;
        if (index > 0 && !foundFirstParameter) {
            if (hasTrailingSlash(result)) {
                result += headSlashedPart.slice(1);
            } else {
                result += headSlashedPart;
            }
        } else {
            result += part;
        }

        if (result.split("?").length > 1) {
            foundFirstParameter = true;
        }


    });

    return result;
}

function hasHeadSlash(target: string): boolean {
    return target.slice(0, 1) === "/";
}

function hasTrailingSlash(target: string): boolean {
    return target.match(/\/(\?.*|)$/) !== null;
}

function hasTrailingQuestion(target: string): boolean {
    return target.slice(-1) === "?";
}

function hasTrailingAmpersand(target: string): boolean {
    return target.slice(-1) === "&";
}


export function hasQueryParameters(targetURL: string): boolean {
    const fragments = targetURL.split("?");
    return fragments.length > 1 && hasHeadQuestion(fragments[2]);
}

function hasHeadQuestion(target: string): boolean {
    return target.slice(0, 1) === "?" && target.length > 1;
}

function hasHeadAmpersand(target: string): boolean {
    return target.slice(0, 1) === "&" && target.length > 1;
}