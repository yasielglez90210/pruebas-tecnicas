import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

interface Props {
  handleNextPage: () => void
}

export default function Visor({ handleNextPage }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, { rootMargin: '300px' })
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (isVisible) {
      handleNextPage()
    }
  }, [isVisible])

  return <div ref={ref}></div>
}
