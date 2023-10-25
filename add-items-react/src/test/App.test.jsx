import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('<App/>', () => {
  //   test('should work', () => {
  //     render(<App />)
  //     screen.debug()
  //     expect(screen.getByText('Prueba técnica de React')).toBeDefined()
  //   })

  test('should add items and remove them', async () => {
    const user = userEvent.setup()

    render(<App />)

    // buscar el input
    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    // buscar el formulario
    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    // buscar el boton
    const button = form.querySelector('button')
    expect(button).toBeDefined()

    const randonText = crypto.randomUUID()
    await user.type(input, randonText)
    await user.click(button)

    // verificar que fue añadido el nuevo item
    const list = screen.getByRole('list')
    expect(list).toBeDefined()
    expect(list.childNodes.length).toBe(1)

    // verificar que podemos borrar un elemento
    const item = screen.getByText(randonText)
    expect(item).toBeDefined()

    await user.click(item)

    const listEmpty = screen.getByText('No hay elementos en la lista')
    expect(listEmpty).toBeDefined()
  })
})
