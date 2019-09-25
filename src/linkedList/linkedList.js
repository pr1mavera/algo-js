/**
 * Node
 * @param {any} ele 初始化时该节点的值
 */
class Node {
    constructor(ele) {
        this.value = ele
        this.next = null
        // let element = ele
        // let next = null
        // return {
        //     getVal: () => element,
        //     getNext() => next,
        //     setNext: newNext => {
        //         next = newNext
        //         return next
        //     }
        // }
    }
}

function LinkedList() {
    let head = new Node('head')

    /**
     * 根据value查找节点
     * @param {any} value 目标值
     * @param {Node} curNode 当前处理节点
     */
    function findByValue(value, curNode = head) {
        if (curNode.value === value) {
            return curNode
        }
        return curNode.next
                ? findByValue(value, curNode.next)
                : -1
    }

    /**
     * 根据index查找节点
     * @param {Number} index 目标索引
     * @param {Number} pos 当前处理位置
     * @param {Node} curNode 当前处理节点
     */
    function findByIndex(index, pos = 0, curNode = head) {
        if (pos === index) {
            return curNode
        }
        return curNode.next
                ? findByIndex(index, ++pos, curNode.next)
                : -1
    }

    /**
     * 指定元素向后插入
     * @param {any} newEle 待插入元素
     * @param {any} val 要在其后插入节点的值
     */
    function insert(newEle, val) {
        const curNode = findByValue(val)
        if (curNode === -1) {
            console.log('未找到插入位置')
            return void 0
        }
        // 初始化新节点
        const newNode = new Node(newEle)
        newNode.next = curNode.next
        curNode.next = newNode
    }

    /**
     * 查找前一个
     * @param {any} item 目标节点的值
     * @param {Node} curNode 当前处理节点
     */
    function findPrev(item, curNode = head) {
        if (curNode.next && curNode.next.value === item) {
            return curNode
        }
        return curNode.next && curNode.next.next
                ? findPrev(item, curNode.next)
                : -1
    }

    /**
     * 根据值删除
     * @param {any} item 待移除元素
     */
    function remove(item) {
        if (item === 'head') {
            console.warn('WARN in LinkedList.remove: head节点不可删除！')
            return void 0
        }
        const curNode = findByValue(item)
        if (curNode === -1) {
            console.log('未找到插入位置')
            return void 0
        }
        const qrevNode = findPrev(item)
        qrevNode.next = curNode.next
    }

    /**
     * 遍历显示所有节点
     * @param {any} curNode 当前处理节点
     */
    function display(curNode = head, valStr = '') {
        const res = `${valStr}${valStr ? ' -> ' + curNode.value : curNode.value}`
        return curNode.next
                ? display(curNode.next, res)
                : console.log(res)
    }

    /**
     * 单链表反转（尾插法）
     */
    function reverseList() {
        const cur = head.next || {}
        const next = cur.next
        if (!next) {
            // 链表长度小于3
            return void 0
        }

        // 初始化头节点
        const root = new Node('head')
        // 尾插法
        function insertInTail(curNode, nextNode, root) {
            curNode.next = root.next
            root.next = curNode
            return nextNode
                    ? insertInTail(nextNode, nextNode.next, root)
                    : void 0
        }
        insertInTail(cur, next, root)
        // 替换头节点
        head = root
    }

    /**
     * 链表中环的检测
     */
    function checkCircle(fast = head.next, slow = head) {
        if (fast === slow) {
            return true
        }
        return fast && fast.next
                ? checkCircle(fast.next.next, slow.next)
                : false
    }

    /**
     * 删除链表倒数第K个结点
     * @param {Number} k 索引
     */
    function removeByIndexFromEnd(k) {
        if (checkCircle()) {
            // 若是环状列表，直接退出
            return void 0
        }
        // 反转链表
        reverseList()
        // 待删除的节点
        const targetNode = findByIndex(k)

        targetNode !== -1 && remove(targetNode.value)

        // 撤销反转
        reverseList()
    }

    /**
     * 求链表的中间结点
     */
    function findMiddleNode(fast = head, slow = head) {
        return fast.next && fast.next.next
                ? findMiddleNode(fast.next.next, slow.next)
                : slow
    }

    return {
        findByValue,
        findByIndex,
        insert,
        findPrev,
        remove,
        display,
        reverseList,
        checkCircle,
        removeByIndexFromEnd,
        findMiddleNode
    }
}

/**
 * 两个有序的链表合并
 */