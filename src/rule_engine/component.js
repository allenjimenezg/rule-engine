const TreeBuilder           = require('./tree_builder');
const Operator              = require('./operator');

const CONDITION_NODE_TYPE   = 'condition';
const ALL_GROUPING          = 'all';
const ANY_GROUPING          = 'any';

class RuleEngine {

    /**
     * RUNS THE RULE ENGINE TO EVALUATE SOME SCHEMA AGAINST SOME RULES
     *
     * @param {Object} rules
     * @param {Object} schema
     *
     * @return {Boolean}
     * */
    static async run(rules, schema) {
        const tree = TreeBuilder.build(rules);
        const treeEvaluation = await RuleEngine.evaluateTree(tree, schema);
        return treeEvaluation;
    }

    /**
     * EVALUATE THE SCHEMA AGAINST THE BUILDED TREE OF RULES
     *
     * @param {Tree} tree
     * @param {Object} schema
     *
     * @return {Boolean}
     * */
    static async evaluateTree(tree, schema) {
        const rootNode          = tree.root;
        const nodeEvaluation    = await RuleEngine.evaluateNode(rootNode, schema);
        return nodeEvaluation;
    }

    /**
     * EVALUATE A PARTICULAR NODE INSIDE THE TREE
     *
     * @param {Node} node
     * @param {Object} schema
     *
     * @return {Boolean}
     * */
    static async evaluateNode(node, schema) {
        if(node) {
            const childrens = node.childrens;
            if (childrens.length > 0) {
                const evaluatedConditions = await Promise.all(childrens.map(async (childrenNode) => {
                    return await RuleEngine.evaluateNode(childrenNode, schema);
                }));

                const passedConditions = evaluatedConditions.filter((evaluation) => evaluation ? true : false);

                if (node.type === ALL_GROUPING) {
                    return passedConditions.length === evaluatedConditions.length;
                } else if (node.type === ANY_GROUPING) {
                    return passedConditions.length > 0;
                }
            } else if (node.type === CONDITION_NODE_TYPE) {
                return RuleEngine.evaluateCondition(node.content, schema);
            }
        } return false;
    }

    /**
     * EVALUATE THE SCHEMA BASED ON SOME FINAL CONDITION
     *
     * @param {Object} condition
     * @param {Object} schema
     *
     * @return {Boolean}
     * */
    static evaluateCondition(condition, schema) {
        const fieldPath = condition.field.split('.');
        const operator  = condition.operator;

        let tmpObj      = schema;

        for (let i = 0; i < fieldPath.length; ++i) {
            const field = fieldPath[i];
            if (tmpObj.hasOwnProperty(field)) {
                tmpObj = tmpObj[field];
            } else {
                tmpObj = null;
                break;
            }
        }
        let value = tmpObj;
        return Operator.apply(value, condition.value, operator);
    }

    /**
     * EVALUATE THE RULES TO FIND IF IT SATISFY THE RULES DEFINITION SCHEMA
     *
     * @param {Object} rules
     *
     * @return {Boolean}
     * */
    static async validate(rules) {
        try{
            const tree = TreeBuilder.build(rules);
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = RuleEngine;