const MenuHeader = ({ banner, title }: { banner: string; title: string }) => {
  return (
    <div style={{ background: `url("${banner}")` }} className="menu__header">
      <h2>{title}</h2>
    </div>
  )
}

export { MenuHeader }
