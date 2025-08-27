import { GitHubIcon } from "../ui/icons/github-icon";
import { GitLabIcon } from "../ui/icons/gitlab-icons";
import { BitbucketIcon } from "../ui/icons/bitbucket-icon";

export const getProviderIcon = (provider?: string) => {
    switch (provider?.toLowerCase()) {
        case 'github':
            return <GitHubIcon />;
        case 'gitlab':
            return <GitLabIcon />;
        case 'bitbucket':
            return <BitbucketIcon />;
        default:
            return <GitHubIcon />;
    }
};