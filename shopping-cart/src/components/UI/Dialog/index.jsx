import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function MyDialog({ children, ...props }) {
  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className={`fixed inset-0 z-40 flex ${props.position}`}>
          <Transition.Child
            as={Fragment}
            enter={props.enter}
            enterFrom={props.enterFrom}
            enterTo={props.enterTo}
            leave={props.leave}
            leaveFrom={props.leaveFrom}
            leaveTo={props.leaveTo}
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
