import 'regenerator-runtime/runtime'

function ReplaceWithPolyfill() {
    'use-strict' 
    var parent = this.parentNode,
        i = arguments.length,
        currentNode
    if (!parent) return
    if (!i) parent.removeChild(this)
    while (i--) {
        currentNode = arguments[i]
        if (typeof currentNode !== 'object') {
            currentNode = this.ownerDocument.createTextNode(currentNode)
        } else if (currentNode.parentNode) {
            currentNode.parentNode.removeChild(currentNode)
        }
        if (!i) {
            parent.replaceChild(currentNode, this)
        } else {
            parent.insertBefore(currentNode, this.previousSibling)
        }
    }
}

if (!Element.prototype.replaceWith) {
    Element.prototype.replaceWith = ReplaceWithPolyfill
}

if (!CharacterData.prototype.replaceWith) {
    CharacterData.prototype.replaceWith = ReplaceWithPolyfill
}

if (!DocumentType.prototype.replaceWith) {
    DocumentType.prototype.replaceWith = ReplaceWithPolyfill
}
