class Operator {

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

    static apply(value1, value2, operator) {
        if(Operator.operatorMapping.hasOwnProperty(operator)) {
            return Operator.operatorMapping[operator](value1, value2);
        }
        return false;
    }

    static eq(value1, value2) {
        return value1 === value2;
    }

    static neq(value1, value2) {
        return !Operator.eq(value1, value2);
    }

    static gt(value1, value2) {
        return value1 > value2;
    }

    static gte(value1, value2) {
        return value1 >= value2;
    }

    static lt(value1, value2) {
        return value1 < value2;
    }

    static lte(value1, value2) {
        return value1 <= value2;
    }

    static in(value1, value2) {
        return value2.includes(value1);
    }

    static nin(value1, value2) {
        return !Operator.in(value1, value2);
    }

    static has(value1, value2) {
        return value1.contains(value2);
    }

    static nhas(value1, value2) {
        return !Operator.has(value1, value2);
    }
}

module.exports = Operator;