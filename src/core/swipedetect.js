export function SwipeDetect(_elem) {
	const elem = _elem
	this.direct = 'none'
	this.offsetDist = 100
	this.startX = 0
	this.startY = 0
	this.distX = 0
    this.distY = 0
    this.isResolve = false

	const onStart = (e) => {
        const touchobj = e.type.includes('touch') ? e.changedTouches[0] : e
        this.isResolve = true
		this.direct = 'none'
		this.startX = this.distX = touchobj.pageX
		this.startY = this.distY = touchobj.pageY
		this.onStart(e)
	}

	const onMove = (e) => {
		if (this.isResolve) {
            const touchobj = e.type.includes('touch') ? e.changedTouches[0] : e
			this.distX = touchobj.pageX - this.startX
			this.distY = touchobj.pageY - this.startY
			this.onMove(e)
		}
	}

	const onEnd = (e) => {
		if (this.isResolve) {
            let moveX = Math.abs(this.startX) - Math.abs(this.distX)
            let moveY = Math.abs(this.startY) - Math.abs(this.distY)
			let isVerical = (moveY > this.offsetDist)
            let isHorizon = (moveX > this.offsetDist)
            if (isHorizon) {
                this.direct = (this.distX < 0) ? 'left' : 'right'
            } else if (isVerical) {
                this.direct = (this.distY < 0) ? 'up' : 'down'
            }
            this.onEnd(e)
            this.isResolve = false
		}
	}


	this.init = () => {
		elem.addEventListener('mousedown', onStart, false)
        elem.addEventListener('touchstart', onStart, false)
        
		elem.addEventListener('mousemove', onMove, false)
        elem.addEventListener('touchmove', onMove, false)
        
		elem.addEventListener('mouseup', onEnd, false)
		elem.addEventListener('touchend', onEnd, false)
	}

	this.detstroy = () => {
        elem.removeEventListener('mousedown', onStart, false)
        elem.removeEventListener('touchstart', onStart, false)
        
		elem.removeEventListener('mousemove', onMove, false)
        elem.removeEventListener('touchmove', onMove, false)
        
		elem.removeEventListener('mouseup', onEnd, false)
		elem.removeEventListener('touchend', onEnd, false)
	}

	this.onStart = (e) => { }
	this.onMove = (e) => { }
	this.onEnd = (e) => { }
}