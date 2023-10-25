import { useState } from 'react'

export const useItems = () => {
  const [items, setList] = useState([])

  const addItem = (text) => {
    const newItem = {
      id: crypto.randomUUID(),
      title: text,
    }

    setList((prevList) => {
      return [...prevList, newItem]
    })
  }

  const removeItem = (id) => {
    setList((prevList) => {
      return prevList.filter((curretItem) => curretItem.id !== id)
    })
  }

  return { items, addItem, removeItem }
}
