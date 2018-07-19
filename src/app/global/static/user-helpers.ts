export class UserHelpers {
    public static getAvatarUrl(user): string {
        if (user && user.auth && user.auth.avatar_url) {
            return user.auth.avatar_url;
        }
        return null;
    }
}
