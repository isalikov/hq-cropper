import type {
    ApplicationState,
    CreateState,
    Listener,
    ListenerAction,
} from '../types'

let listenerId = 0

const createState = (initialState: ApplicationState): CreateState => {
    const listeners = new Map<string, Listener<unknown>[]>()
    const state = new Proxy<ApplicationState>(
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

    const getState = (): ApplicationState => ({ ...state })

    const setState = (partialState: Partial<ApplicationState>) => {
        for (const key of Object.keys(
            partialState
        ) as (keyof ApplicationState)[]) {
            const value = partialState[key]
            if (value !== undefined) {
                ;(state as Record<keyof ApplicationState, unknown>)[key] = value
            }
        }
    }

    const subscribe = <T>(prop: string, action: ListenerAction<T>): string => {
        const id = String(++listenerId)
        const propListeners = listeners.get(prop) || []

        listeners.set(prop, [
            ...propListeners,
            {
                action: action as ListenerAction<unknown>,
                id,
            },
        ])

        return id
    }

    const unsubscribe = (id: string): void => {
        for (const [prop, propListeners] of listeners.entries()) {
            const filtered = propListeners.filter((l) => l.id !== id)
            if (filtered.length !== propListeners.length) {
                listeners.set(prop, filtered)
                return
            }
        }
    }

    const unsubscribeAll = (): void => {
        listeners.clear()
    }

    return { getState, setState, subscribe, unsubscribe, unsubscribeAll }
}

export default createState
