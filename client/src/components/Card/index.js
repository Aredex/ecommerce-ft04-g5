import React from 'react'
import style from './index.module.scss'

function Header({ className, children }) {
  return (
    <header className={[style.header, className].join(' ')}>
      {children}
    </header>
  )
}
function Body({ className, children }) {
  return (
    <header className={[style.body, className].join(' ')}>
      {children}
    </header>
  )
}
function Footer({ className, children }) {
  return (
    <header className={[style.footer, className].join(' ')}>
      {children}
    </header>
  )
}

function Card({ className, children }) {
  return (
    <div className={[style.card, className].join(' ')}>
      {children}
    </div>
  )
}

Card.Header = Header
Card.Body = Body
Card.Footer = Footer

export default Card
