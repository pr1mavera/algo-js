/**
 * Node
 * @param {any} ele 初始化时该节点的值
 */
class Node {
    constructor(ele) {
        let element = ele
        let next = null
        return {
            getVal: () => element,
            getNext: () => next,
            setNext: newNext => {
                next = newNext
                return next
            }
        }
    }
}

function LinkedList() {
    const head = new Node('head')

    /**
     * 根据value查找节点
     * @param {any} value 目标值
     * @param {Node} curNode 当前处理节点
     */
    function findByValue(value, curNode = head) {
        if (curNode.getVal() === value) {
            return curNode
        }
        return curNode.getNext()
                ? findByValue(value, curNode.getNext())
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
        return curNode.getNext()
                ? findByIndex(index, ++pos, curNode.getNext())
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
        newNode.setNext(curNode.getNext())
        curNode.setNext(newNode)
    }

    /**
     * 查找前一个
     * @param {any} item 目标节点的值
     * @param {Node} curNode 当前处理节点
     */
    function findPrev(item, curNode = head) {
        if (curNode.getNext() && curNode.getNext().getVal() === item) {
            return curNode
        }
        return curNode.getNext() && curNode.getNext().getNext()
                ? findPrev(item, curNode.getNext())
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
        qrevNode.setNext(curNode.getNext())
    }

    /**
     * 遍历显示所有节点
     * @param {any} curNode 当前处理节点
     */
    function display(curNode = head) {
        console.log(curNode.getVal())
        return curNode.getNext()
                ? display(curNode.getNext())
                : void 0
    }

    /**
     * 单链表反转
     */

    /**
     * 链表中环的检测
     */

    return {
        findByValue,
        findByIndex,
        insert,
        findPrev,
        remove,
        display
    }
}