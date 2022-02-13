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

Linked List
    takes any values
    don't work with indexes
    every element has a pointer at the next element in line (link)
    an element doesn't know about the previous element
        an element in a linked list is called a NODE

    why?
    allows for efficient rezing and insertion at start and end of list

    how/why to use?
    builds on top of existing structures
    also enhances with certain functionality

    head = first node in the LL
    tail = last node in the LL

    a list only knows its head and tail nodes, none of the others

    why would you want to use a linked list vs array?
        linked lists are old
        memory management was a bigger issue
        can be useful if you do a lot of insertions at the beginning of lists
            ll are faster at this

    Linked Lists vs Arrays
        LL TC
            Element Access = O(n) - linear
            Insertion at End = O(1) with a tail, O(n) without a tail
            Insertion at Beginning O(1) since all have a head, no effect on elements other than old head
            Insertion in Middle = search time + O(1)
            Search Time = O(n) because we iterate through the array
        Array TC
            Element Access = O(1) if we know the index
            Insertion at End = O(1) arrays are aware of their length, easy to add to that
            Insertion at Beginning = O(n) since all indexes need to be changed
            Insertion in Middle = O(n) same logic as beginning insert
            Search Element = O(n)

        LL only wins with Insertion at Beginning - NICHE!    

*/


class LinkedList {
    constructor() {
        this.head = null // first node of the list
        this.tail = null // last node of the list
    }

    append (value) {
        const newNode = { // new node is an object so that it can store a pointer at the next element
            value: value, 
            next: null
        }
        if(this.tail) { // don't perform the following if this.tail is null (the list is empty)
            this.tail.next = newNode // this references what's about to be the old tail and stores the new tail in the next property
        }
        this.tail = newNode // then the new node gets appended to the list as the tail
        if (!this.head) {
            this.head = newNode // only applies to the first node that gets appended
        } // this also means that when there's only one node in the list it is both head and tail
    }

    prepend (value) { // easy
        const newNode = {
            value: value,
            next: this.head
        }
        this.head = newNode
        if (!this.tail) {
            this.tail = newNode
        }
    }

    insertAfter(value, afterValue) {
        const existingNode = this.find(afterValue)

        if (existingNode) {
            const newNode = {
                value: value,
                next: existingNode.next // the new node takes the old node's next value
            }
            existingNode.next = newNode // put the new node between the existing node and the old next node
        }
    }

    find (value) {
        if (!this.head) {
            return null
        } 

        let curNode = this.head
        while (curNode) {
            if (curNode.value === value) {
                return curNode
            } else {
                curNode = curNode.next
            }
        }
        return null
    }

    delete (value) {
        if (!this.head) {
            return
        }

        while (this.head && this.head.value === value) { // while there's a head and its value is the one we are looking for
            this.head = this.head.next // make the head the next node
        }

        let curNode = this.head
        while (curNode.next) {  // while the current node's next value isn't null (does evaluate truthy)
            if (curNode.next.value === value) { // if the current node's next value is the value we're trying to delete
                curNode.next = curNode.next.next // made the current node's next value the next value that is one beyond the next node
            } else {
                curNode = curNode.next // else move on to the next one, loop again
            }
        }
        if (this.tail.value === value) { // ensure we have a tail value (its pointer might be deleted during the 2nd while loop)
            this.tail = curNode // make the tail the last node that did not evaluate true in the while if condiditon
        }
    }

    toArray() { // if we want to look at all of the nodes on the list
        const elements = []
        let curNode = this.head
        while (curNode) {
            elements.push(curNode)
            curNode = curNode.next
        }
        return elements
    }
}

const linkedList1 = new LinkedList

linkedList1.append(1)
linkedList1.append('hello')
linkedList1.append('max')
linkedList1.append('max')
linkedList1.append(true)
linkedList1.append(18.52)

linkedList1.prepend(22)
linkedList1.insertAfter(69, true)
linkedList1.insertAfter('yes', 1)

console.log(linkedList1.find('max'))

console.log(linkedList1.toArray())

linkedList1.delete('max')
linkedList1.delete(22)
linkedList1.delete(18.52)

console.log(linkedList1.find('max'))

console.log(linkedList1.toArray())
