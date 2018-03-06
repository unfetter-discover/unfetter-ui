import { TreeNode } from './tree-node';

export class CourseOfActionChild extends TreeNode {
    type = 'course-of-action';
    constructor(name = '', color = '', description = '', children = []) {
        super(name, color, description, children);
    }
}
