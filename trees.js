/* 
CUSTOM DATA STRUCTURES
    used for niche optimization

    TIME COMPLEXITY & BIG O NOTATION
        We don't necessarily measure the literal time, we care more about the trend and measure it in Big O Notation
    
        Linear time = O(n)
            a bigger loop lears to more iterations, time increases in linear way
        Constant Time = O(1)
            a task no matter the size completes in the same amount of time
        Quadratic Time = O(n2)
            a task takes longer the deeper it gets into execution but not as long as...
        Cubic Time = O(n3)
            slows down at n cubed


    Trees
        Root = parentless node
        Child = node with a parent
        Leaf = node with no children
        Edge = a connection between two nodes

        Binary Tree 
            = every node has at most 2 children
            = has exactly 1 root
            = has exactly 1 path between root and any node
                parents cannot share a child
        
        Empty trees are binary trees
*/

class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const a = new Node(2)
const b = new Node(3)
const c = new Node(4)
const d = new Node(5)
const e = new Node(7)
const f = new Node(9)
const g = new Node(17)
const h = new Node(24)
const i = new Node(45)
const j = new Node(33)
const k = new Node(126)


a.left = b
a.right = c
b.left = d
b.right = e
c.right = f



    //       a
    //      / \
    //     b   c
    //    / \   \
    //   d   e   f

   
/* 
Depth First Searches
    a -> b -> d -> e -> c -> f

    Stack/Current Data Stucture
        a gets pushed onto stack in first iteration
        a leaves stack, designated as current
            values: a
        c (right child) gets added first, then b (left child) added on top
        b (from top of stack) replaces a (no more children) as current
            values: a, b
        e (right), then d (left) added to stack (c still below)
        b (no more children) then replaced as current by d (from top of stack)
            values: a, b, d
        d has no more children, replaced as current by e
            values: a, b, d, e
        e has no more children, replaced as current by c
            values: a, b, d, e, c
        f gets added to stack
        f replaces c as current
            values: a, b, d, e, c, f

    Depth First Values
        Time Complexity = O(n)
        Space Complexity = O(n)

    Breadth First Values
        Time Complexity = O(n)
        Space Complexity = O(n)    
*/

        //       a
        //      / \
        //     b   c
        //    / \   \
        //   d   e   f
        //  /   / \    \
        // g   h   i    j
        //          \    
        //           k

        // a b d g e h i k c f j

    d.left = g
    e.left = h
    e.right = i
    f.right = j
    i.right = k

    const depthFirstValues = (root) => {
        if (root === null) {
            return []
        }
        
        const result = [] // initiate the return value
        const stack = [ root ] // establish a STACK
        while (stack.length > 0) { // set the continuing condition
            const current = stack.pop() // pop the root off the stack and call it current
            result.push(current.val) // push the current.val to the result array
            
            // look right first, then left
            if (current.right) {
                stack.push(current.right) // if there's something there, push it to the stack
            }
            if (current.left) {
                stack.push(current.left) // if there's something there, push it to the stack
            }

            // while loop repeats: 
                // take the top stack item, push its value to the return [], look right, left, add to the stack
        }
        return result
    }

    console.log(depthFirstValues(a))


    // RECURSIVE VERSION 

    const depthFirstValuesRecursive = (node) => {
        
        // BASE CASE - the condition that needs to be met for the recursion to stop running
        // defined based on the reason for creating the function
        if (node === null) return []

        // all values of each call will be stored on itself
        // in this case both calls are made for each node and returned to each variable
        const left = depthFirstValuesRecursive(node.left) // [b, d, e]
            // in this call
                // node.val = b, left = d, right = e
        const right = depthFirstValuesRecursive(node.right) // [c, f]
            // in this call
                // left = null, right = f

        return [ node.val, ...left,...right ] 
            // then node.val = a, left = [b, d, e], right = [c,f]
            // the use of the spread (...left/right) spreads the values of the array that each call returns
                // only the return array is returned, not nested
    }

    console.log(depthFirstValuesRecursive(a))

    const recFunc = (x) => {
        if (x <= 1) { 
            return x
        }
        return x * recFunc(x - 1)
    }

    console.log(recFunc(4))

    function sum(n) {
        if (n <= 1) {
        return n;
        }
        return n + sum(n - 1);
    }

    console.log(sum(5))

/*

    //       a
    //      / \
    //     b   c
    //    / \   \
    //   d   e   f

Breadth First Values
    a -> b -> c -> d -> e -> f

    Queue Data Structure
        a is initialized
            if there are no more siblings
                a is moved off the queue
                a is established as current
                a is added to value list
                a is checked for children
        b is added: q = b ->
        c is added: q = c, b ->
            if there are no more siblings
                b is moved off the queue
                b is established as current (a leaves here)
                b is added to value list
                b is checked for children
        d is added: q = d, c ->
        e is added: q = e, d, c ->      
            process repeated for c
        f is added: q = f, e, d ->    
            process repeated for d  
            process repeated for e  
            process repeated for f  

*/

const breadthFirstValues = (node) => {
    if (node === null) return []
    
    const queue = [ node ] // initialize the cue with the node that's passed in
    const result = [] // initialize the return array
    
    while (queue.length > 0) { // while there's something in the queue
        let curNode = queue.shift() // establish the first value in the queue as the current 
        result.push(curNode.val) // add the value of current to the result array

        if(curNode.left){ // if there's a left node
            queue.push(curNode.left) // push it to queue (on the opposite end you're pulling curNode from)
        }
        if(curNode.right){ // same for right
            queue.push(curNode.right)
        }
    }
    return result // return the resulting array
}

console.log(breadthFirstValues(a))

        // PRACTICE
        const breadthFirstValues2 = (root) => {
            const q = [ root ]
            const r = []

            if (root === null) return []

            while (q.length > 0) {
                let curNode = q.shift()
                r.push(curNode.val)

                if (curNode.left) q.push(curNode.left)
                if (curNode.right) q.push(curNode.right)
            }
            return r
        }

        console.log(breadthFirstValues2(a))

        const depthFirstValues3 = (root) => {
            if (root === null) return []

            const result = []
            const stack = [root]
            
            while (stack.length > 0){
                let curNode = stack.pop()
                result.push(curNode.val)

                if (curNode.right) stack.push(curNode.right)
                if (curNode.left) stack.push(curNode.left)

                curNode = curNode.left
            }
            return result
        }

        console.log(depthFirstValues3(a))

        const recursion = (root) => {
            if (root === null) return []
            return [root.val, ...recursion(root.left), ...recursion(root.right)]
        }

        console.log(recursion(a))

/*
Tree Includes

Breadth First
    Time: O(n)
    Space: O(n)

Recursive Depth First
    Time: 
    Space:  

*/

const treeIncludesBreadthFirst = (root, target) => {
    if (root === null) return false
    
    const queue = [root]
    while (queue.length > 0) {
        const cur = queue.shift()
        if(cur.val === target) return true
        
        if(cur.left) queue.push(cur.left)
        if(cur.right) queue.push(cur.right)
    }
    return false
}

console.log(treeIncludesBreadthFirst(a, "33"))

const treeIncludesRecursive = (root, target) => {
    if (root === null) return false // always guard against null root
    if (root.val === target) return true // check root to see if it is the target

    // use the OR operator to return a boolean if one of these evaluates true
    return treeIncludesRecursive(root.left, target) || treeIncludesRecursive(root.right, target)
}

console.log(treeIncludesRecursive(a, "j"))

/*
Tree Sum

Breadth First
    Time: O(n)
    Space: O(n)

Recursive Depth First
    Time: O(n)
    Space: O(n)

*/

const treeSumRecursive = (root) => {
    if (root === null) return 0
    return root.val + treeSumRecursive(root.left) + treeSumRecursive(root.right)
    // only using to deal with my numbers being strings
}

console.log(treeSumRecursive(a))

const treeSumBreadthFirst = (root) => {
    if (root === null) return 0

    const queue = [ root ]
    let sum = 0

    while (queue.length > 0){
        const cur = queue.shift()
        sum += cur.val

        if (cur.left) queue.push(cur.left)
        if (cur.right) queue.push(cur.right)

    }
    return sum
}

console.log(treeSumBreadthFirst(a))

/*
Tree Min Value

Breadth First
    Time: O(n)
    Space: O(n)

Recursive Depth First
    Time: O(n)
    Space: O(n)

*/

const treeMinValBreadthFirst = (root) => {
    if (root === null) return null

    const queue = [ root ]
    let minVal = root.val

    while (queue.length > 0){
        const cur = queue.shift()
        if (cur.val < minVal) [
            minVal = cur.val
        ]

        if (cur.left) queue.push(cur.left)
        if (cur.right) queue.push(cur.right)

    }
    return minVal
}

console.log(treeMinValBreadthFirst(a))


const treeMinValDepthFirst = (root) => {
    if (root === null) return null

    const stack = [ root ]
    let minVal = root.val // Infinity?

    while (stack.length > 0) {
        const cur = stack.pop()
        if (cur.val < minVal) {
            minVal = cur.val
        }
        if (cur.right) stack.push(cur.right)
        if (cur.left) stack.push(cur.left)

    }
    return minVal
}

console.log(treeMinValDepthFirst(a))

const treeMinValRecursive = (root) => {
    if (root === null) return Infinity
    const leftMin = treeMinValRecursive(root.left) 
    const rightMin = treeMinValRecursive(root.right)
    return Math.min(root.val, leftMin, rightMin)
    // Math.min finds the lowest value
}

console.log(treeMinValRecursive(a))

/*
Max Path Sum

Recursive (Depth First)
    Time: O(n)
    Space: O(n)

*/

const maxPathSumRecursive = (root) => {
    if (root === null) return -Infinity
    if (root.left === null && root.right === null) return root.val
    const maxLeft = maxPathSumRecursive(root.left) 
    const maxRight = maxPathSumRecursive(root.right)
    const maxChild = Math.max(maxLeft, maxRight)
    return root.val + maxChild
}

console.log(maxPathSumRecursive(a))
