export interface Tree{
  depth:number,
  treeNode?:TreeNode
}

export interface TreeNode{
  id?:string,
  value:number,
  leftNode?:TreeNode,
  rightNode?:TreeNode
}