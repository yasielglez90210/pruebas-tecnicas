import { useEffect, useState } from 'react'

const FACT_ENDPOINT = 'https://catfact.ninja/fact'

export default function useGetInfo() {
  const [fact, setFact] = useState()
  const [cat, setCat] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(FACT_ENDPOINT)
      .then((response) => {
        if (!response.ok) throw new Error('Error fetching fact')
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        const { fact } = data
        setFact(fact)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]

    fetch(`https://cataas.com/cat/says/${firstWord}`)
      .then((response) => {
        if (!response.ok) throw new Error('Error fetching cat')
        response.blob().then((blobResponse) => {
          const urlCreator = window.URL || window.webkitURL
          const imageUrl = urlCreator.createObjectURL(blobResponse)
          setCat(imageUrl)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [fact])

  return { fact, cat, loading }
}
