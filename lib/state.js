const listeners = new Map([])

const state = new Proxy({ }, {
    set(target, prop, value) {
        Reflect.set(target, prop, value)

        const subscriptions = listeners.get(prop) || []

        subscriptions.forEach((callback) => callback(value, target, prop))

        return true
    },
})

export function getState() {
    return { ...state }
}

export function setState(payload = { }) {
    Object.keys(payload).forEach((key) => { state[key] = payload[key] })
}

export function subscribe(key, onChange) {
    const subscriptions = listeners.get(key) || []

    listeners.set(key, [...subscriptions, onChange])
}

export default function createState(initialState) {
    setState(initialState)

    return { getState, setState }
}
