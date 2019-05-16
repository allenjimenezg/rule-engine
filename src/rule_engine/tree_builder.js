const Tree = require('./tree');
const Node = require('./node');

const GROUPING_KEYS = ['all', 'any'];

class TreeBuilder {

    /**
     * BUILD A NEW RULES TREE BASED ON A JSON DEFINITION
     *
     * @param {Object} jsonRules - Json object defining the rules to be applied
     *
     * @return {Tree}
     * */
    static build(jsonRules) {
        const tree = new Tree();
        if(Object.keys(jsonRules).length > 0) {
            this.traverse(jsonRules, tree.root);
        }
        // PROCESS JSON TO BUILD THE NODES AND FILL THE TREE
        return tree;
    }

    /**
     * TRAVERSE THE CURRENT JSON OBJECT
     *
     * @param {Object} rule
     * @param {Node} parent
     *
     * */
    static traverse(rule, parent) {
        if (Array.isArray(rule)) {
            if (rule.length > 0) {
                rule.forEach((sentence) => {
                    const node = this.traverse(sentence, parent);
                    if (node) {
                        parent.addChildren(node);
                    }
                });
            }
        } else if(rule instanceof Object) {
            const grouping = GROUPING_KEYS.filter((key) => rule.hasOwnProperty(key));
            if(grouping.length > 0) { // IS A GROUPING NODE
                grouping.forEach((key) => {
                    const node = new Node(key);
                    parent.addChildren(node);
                    this.traverse(rule[key], node);
                });
                return;
            }
            return new Node('condition', rule); // IS A CONDITION NODE
        }
    }
}

module.exports = TreeBuilder;