export const getProviderName = (provider?: string) => {
    switch (provider?.toLowerCase()) {
        case 'github':
            return 'GitHub';
        case 'gitlab':
            return 'GitLab';
        case 'bitbucket':
            return 'Bitbucket';
        default:
            return 'GitHub';
    }
};
