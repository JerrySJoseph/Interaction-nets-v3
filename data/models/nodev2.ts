
const TreeNodeTypes={
    ADD_OP:0,
    SUB_OP:1,
    MUL_OP:2,
    DIV_OP:3,
    MOD_OP:4,
    NUMBER:5,
}

export interface TreeNode{
    id:string,
    label:string,
    value:number,
    type:number,
    principal:TreeNode,
    auxilary:TreeNode[]
}


function compute(root:TreeNode):TreeNode{
    
}