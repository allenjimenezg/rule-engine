class Node {

    /**
     * BUILD A NODE OBJECT
     *
     * @param {String} type - oneOf ['all', 'any', 'condition']
     * @param {Node} parent - the parent node
     * @param {Array} childrens - the node below the current node
     * */
    constructor(type, content=null, childrens=[]) {
        this.type       = type;
        this.childrens  = childrens;
        this.content    = content;
    }

    /**
     * ADD A CHILDREN TO THE NODE
     *
     * @param {Node} children - the children to add to the current node
     *
     * */
    addChildren(children) {
      this.childrens.push(children);
    }
}

module.exports = Node;