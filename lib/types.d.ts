export declare type HtmlCheckerOptions = Partial<{
    acceptedSchemes: Array<string>;
    excludedKeywords: Array<string>;
    excludedSchemes: Array<string>;
    includedKeywords: Array<string>;
    excludeExternalLinks: boolean;
    excludeInternalLinks: boolean;
    excludeLinksToSamePage: boolean;
    honorRobotExclusions: boolean;
    filterLevel: number;
    userAgent: string;
}>;
export declare type BrokenLink = {
    originalURL: string;
    redirectedURL: string;
    brokenReasons: Record<string, string>;
};
