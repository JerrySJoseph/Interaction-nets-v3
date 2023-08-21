import Node from "./node";

export class AdditionNode extends Node{
    constructor(){
        super('Operator',[],'+')
    }
}

export class SubtractionNode extends Node{
    constructor(){
        super('Operator',[],'-')
    }
}

export class MultiplicationNode extends Node{
    constructor(){
        super('Operator',[],'*')
    }
}

export class DivisionnNode extends Node{
    constructor(){
        super('Operator',[],'/')
    }
}

export class ModuloNode extends Node{
    constructor(){
        super('Operator',[],'%')
    }
}

export class ResultNode extends Node{
    constructor(public value:number){
        super('Result',[],value)
    }
}

export class NumberNode extends Node{
    constructor(public value:number){
        super('Constant',[],value)
    }
}