export class UserHelpers {
    public static getAvatarUrl(user): string {
        if (user && user.oauth) {
            const oauth = user.oauth;
            if (user[oauth] && user[oauth].avatar_url) {
                return user[oauth].avatar_url;
            }
        }
        // Support for legacy user model, can be deleted in the future
        if (user.github && user.github.avatar_url) {
            return user.github.avatar_url;
        }
        return null;
    }
}
