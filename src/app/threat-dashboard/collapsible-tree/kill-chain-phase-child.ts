import { TreeNode } from './tree-node';

export class KillChainPhaseChild extends TreeNode {
      type = 'kill_chain_phase';

      constructor(name = '', color = '', description = '', children = []) {
            super(name, color, description, children);
      }
}
