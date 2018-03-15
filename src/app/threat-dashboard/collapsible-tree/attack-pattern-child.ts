import { TreeNode } from './tree-node';

export class AttackPatternChild extends TreeNode {
    type = 'attack-pattern';

    constructor(name = '', color = '', description = '', children = []) {
        super(name, color, description, children);
    }
}
