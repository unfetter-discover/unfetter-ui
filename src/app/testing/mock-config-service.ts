export const mockConfigService = {
    getConfigPromise: (): Promise<any> => {
        return Promise.resolve({
            killChains: [
                {
                    'name': 'mitre-attack',
                    'phase_names': [
                        'persistence',
                        'privilege-escalation'
                    ]
                },
                {
                    'name': 'ctf',
                    'phase_names': [
                        'planning',
                        'research'
                    ],
                    'stage_names': [
                        'Preparation'
                    ]
                }
            ]
        });
    }
}
