export type HtmlCheckerOptions = Partial<{
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
export type BrokenLink = {
	originalURL: string;
	redirectedURL: string;
	brokenReason: string;
}
