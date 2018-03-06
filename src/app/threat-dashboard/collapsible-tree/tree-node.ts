export class TreeNode {
    type: string;
    name: string;
    color: string;
    description: string;
    children: any[];

    constructor(name = '', color = '', description = '', children = [], type?: string) {
        this.name = name;
        this.color = color;
        this.description = description;
        this.children = children;
        if (type) {
            this.type = type;
        }
  }
}
