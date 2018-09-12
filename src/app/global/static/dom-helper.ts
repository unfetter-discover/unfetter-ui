export class DomHelper {
    /**
     * @description Will scroll current page to the top for most/all browsers
     */
    public static ScrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
