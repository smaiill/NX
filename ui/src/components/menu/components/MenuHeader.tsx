import React from 'react'

const MenuHeader = ({ banner, title }: { banner: string; title: string }) => {
  return (
    <div style={{ background: `url("${banner}")` }} className="menu-header">
      <h2>{title}</h2>
    </div>
  )
}

export default MenuHeader
