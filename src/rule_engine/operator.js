class Operator {

    /**
     * RETURN THE MAPPING OF OPERATOR TO FUNCTION
     *
     * @return {Object}
     * */
    static get operatorMapping() {
        return {
            '='     : this.eq,
            '<>'    : this.neq,
            '>'     : this.gt,
            '>='    : this.gte,
            '<'     : this.lt,
            '<='    : this.lte,
            '<*>'   : this.in,
            '<!*>'  : this.nin,
            '<=>'   : this.has,
            '<!=>'  : this.nhas
        };
    }

    /**
     * APPLY THE SELECTED COMPARE OPERATOR TO THE DEFINED VALUES
     *
     * @param {String | Number | Boolean | ARRAY} value1
     * @param {String | Number | Boolean | ARRAY} value2
     *
     * @return {Boolean}
     * */
    static apply(value1, value2, operator) {
        if(Operator.operatorMapping.hasOwnProperty(operator)) {
            return Operator.operatorMapping[operator](value1, value2);
        }
        return false;
    }

    /**
     * CHECK FOR EQUALITY BETWEEN VALUES
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static eq(value1, value2) {
        return value1 === value2;
    }

    /**
     * CHECK FOR NON EQUALITY BETWEEN VALUES
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static neq(value1, value2) {
        return !Operator.eq(value1, value2);
    }

    /**
     * CHECK IF VALUE1 IS GREATER THAN VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static gt(value1, value2) {
        return value1 > value2;
    }

    /**
     * CHECK IF VALUE1 IS GREATER THAN OR EQUAL VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static gte(value1, value2) {
        return value1 >= value2;
    }

    /**
     * CHECK IF VALUE1 IS LESS THAN OR EQUAL VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static lt(value1, value2) {
        return value1 < value2;
    }

    /**
     * CHECK IF VALUE1 IS LESS THAN OR EQUAL VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static lte(value1, value2) {
        return value1 <= value2;
    }

    /**
     * CHECK IF VALUE1 IS IN THE ARRAY VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {Array} value2
     *
     * @return {Boolean}
     * */
    static in(value1, value2) {
        return value2.includes(value1);
    }

    /**
     * CHECK IF VALUE1 IS NOT IN ARRAY VALUE2
     *
     * @param {String | Number | Boolean} value1
     * @param {Array} value2
     *
     * @return {Boolean}
     * */
    static nin(value1, value2) {
        return !Operator.in(value1, value2);
    }

    /**
     * CHECK IF VALUE1 CONTAINS VALUE2
     *
     * @param {Array | String} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static has(value1, value2) {
        if (value1 instanceof Array) {
            return value1.includes(value2);
        } else {
            return true; // TODO: CHECK IF A VALUE IS IN A STRING
        }

    }

    /**
     * CHECK IF VALUE1 DOES NOT CONTAINS VALUE2
     *
     * @param {Array | String} value1
     * @param {String | Number | Boolean} value2
     *
     * @return {Boolean}
     * */
    static nhas(value1, value2) {
        return !Operator.has(value1, value2);
    }
}

module.exports = Operator;