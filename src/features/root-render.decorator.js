export function RootRender(
    tagName, classNames, cbRender = () => {}
) {
    this.elem = document.createElement(tagName)
    classNames.forEach(className => {
        this.elem.classList.add(className)
    })
    
    const render = (root) => {
        if (root) {
            root.replaceWith(this.elem)
            root = null
        }
        cbRender()
    }

    Object.defineProperty(this, 'root', {
		set: render
	})
}