import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../hooks/useItems'

describe('useItems hook', () => {
  test('should add and remove items', () => {
    const { result } = renderHook(() => useItems())

    expect(result.current.items.length).toBe(0)

    act(() => {
      result.current.addItem('Nuevo elemento 1')
      result.current.addItem('Nuevo elemento 2')
    })

    expect(result.current.items.length).toBe(2)

    act(() => {
      result.current.removeItem(result.current.items[0].id)
    })

    expect(result.current.items.length).toBe(1)
  })
})
