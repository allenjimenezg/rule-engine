const Node = require('./node');

class Tree {

    /**
     * CONSTRUCT A NEW TREE WITH A ROUTE NODE
     * */
    constructor() {
        this.root = new Node('all');
    }
}

module.exports = Tree;