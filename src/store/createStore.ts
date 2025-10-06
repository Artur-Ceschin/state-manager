import { useEffect, useState } from 'react'

type SetterFn<T> = (prevState: T) => Partial<T>
type SetStateFn<T> = (partialState: Partial<T> | SetterFn<T>) => void

export function createStore<TState extends Record<string, any>>(
  createInitialState: (setState: SetStateFn<TState>) => TState
) {
  let state: TState
  let listeners: Set<() => void>

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState

    state = {
      ...state,
      ...newValue
    }

    notifyListeners()
  }

  function notifyListeners() {
    listeners.forEach((listener) => listener())
  }

  function getState() {
    return state
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function useStore<TValue>(
    selector: (currentState: TState) => TValue
  ): TValue {
    const [value, setValue] = useState(() => selector(state))

    useEffect(() => {
      const unsubscribe = subscribe(() => {
        const newValue = selector(state)

        if (value !== newValue) {
          setValue(newValue)
        }
      })

      return () => {
        unsubscribe()
      }
    }, [selector, value])

    return value
  }

  state = createInitialState(setState)
  listeners = new Set()

  return { setState, getState, subscribe, useStore }
}
