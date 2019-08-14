export const deepCopy = (data) => {
	return typeof data === 'object' ? (
		JSON.parse(JSON.stringify(data))
	) : (
		data
	)
}

export function Store(_init) {
	let init = deepCopy(_init)
	let state = deepCopy(_init)
	let observers = []

	const broadcast = () => {
		observers.forEach(subscriber => subscriber(state))
	}

	const setState = (data) => {
		state = deepCopy(data)
		broadcast()
	}

	Object.defineProperty(this, 'state', {
		get: () => state,
		set: setState
	})

	this.subscribe = (fn) => {
		observers.push(fn)
		fn(state)
		return () => this.unsubscribe(fn)
	}

	this.unsubscribe = (fn) => {
		observers = observers.filter(subscriber => subscriber !== fn)
	}

	this.reset = () => setState(init)
	
}