import { useCallback } from 'react'
import './App.css'
import { useItems } from './hooks/useItems'
import { ListElements } from './components/ListElements'
import { useSEO } from './hooks/useSEO'

const App = () => {
  const { items, addItem, removeItem } = useItems()

  useSEO({
    title: `[${items.length}] Prueba técnica`,
    description: 'Añadir y eliminar elementos de una lista',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem('newItem')

    addItem(input.value)
    input.value = ''
  }

  const createHandleRemoveItem = useCallback(
    (id) => () => {
      removeItem(id)
    },
    [removeItem]
  )

  return (
    <main>
      <div>
        <h1>Prueba técnica de React</h1>
        <p>Añadir y eliminar elementos de una lista</p>
        <form onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
          <input
            type="text"
            name="newItem"
            placeholder="Nuevo elemento"
            required
          />
          <button>Añadir</button>
        </form>
      </div>
      <div>
        <h3>Listado de elementos</h3>
        <ListElements items={items} handleClick={createHandleRemoveItem} />
      </div>
    </main>
  )
}

export default App
