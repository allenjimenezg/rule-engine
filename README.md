# Rule Engine (rule-engine.ob)
A basic conditions based rules engine to check whether an schema passes the rule

#Example

#Rule schema
The rules are composed by 3 basic components
1. all
2. any
3. condition

- An ```all``` block is an array of rules in which every rule should evaluate as true
- An ```any``` block is an array of rules in which at least one rule should evaluate as true
- A ```condition``` is an object with the fields:
   1. field - The name of field of the schema to check
   2. operator - The operator used to compare the values
   3. value - The value against the rule compare the schema field
### Example
```
const rule = {
    all: [
        {
            any: [
                {
                    field: 'name',
                    operator: '=',
                    value: 'John'
                },
                {
                    field: 'name',
                    operator: '<>',
                    value: 'Daenerys'
                }
            ],
            {
                field: 'age',
                operator: '>',
                value: 25
            }
        }
    ]
};
```
 
