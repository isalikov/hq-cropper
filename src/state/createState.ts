import { getRandomString } from '../utils'
import { State, CreateState, Listener, ListenerAction } from '../types/state'

const createState = (initialState: State): CreateState => {
    const listeners = new Map<string, Listener<unknown>[]>()
    const state = new Proxy<State>(
        { ...initialState },
        {
            set(target, prop, value) {
                Reflect.set(target, prop, value)
                const propListeners = listeners.get(prop as string) || []

                propListeners.forEach((l) =>
                    l.action(value, target, prop as string)
                )

                return true
            },
        }
    )

    const getState = () => ({ ...state })

    const setState = (partialState: Partial<State>) => {
        Object.keys(partialState).forEach((key) => {
            state[key] = partialState[key]
        })
    }

    const subscribe = <T extends unknown>(
        prop: string,
        action: ListenerAction<T>
    ): string => {
        const id = getRandomString()
        const propListeners = listeners.get(prop) || []

        listeners.set(prop, [
            ...propListeners,
            {
                action,
                id,
            },
        ])

        return id
    }

    return { getState, setState, subscribe }
}

export default createState
