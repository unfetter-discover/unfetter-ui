export class SpeedDialItem {
    public constructor(
        public name: string,
        public matIcon?: string,
        public isMatIcon = true,
        public svgIconName?: string,
        public tooltip = '') { 
            if (!matIcon && svgIconName) {
                this.isMatIcon = false;
            }
        }
}
