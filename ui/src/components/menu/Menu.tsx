import { MenuItem, MenuItemTypesE } from '../../../../types/menu'
import { useSelector } from 'react-redux'

const Menu = () => {
  const menuState = useSelector((state: any) => state.menu.menu)

  console.log(menuState)

  return (
    <>
      {menuState !== null && (
        <div
          style={{ width: menuState.options.width }}
          className="menu-wrapper"
        >
          <div className="menu-header">
            <h2>{menuState.options.title}</h2>
            <img src={menuState.options.banner} alt="" />
          </div>

          <div className="menu-items-wrapper">
            {menuState.items.map((item: MenuItem, index: number) => (
              <div
                key={index}
                className={`menu-item ${item.type.toLowerCase()}`}
              >
                <span className="label">{item.label}</span>

                {item.type === MenuItemTypesE.SLIDER && (
                  <input
                    min={item.min ?? 0}
                    max={item.max ?? 10}
                    type="range"
                  />
                )}

                {item.type === MenuItemTypesE.CHECKBOX && (
                  <>
                    <span className="checkbox-style">
                      <input type="checkbox" />
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <div className="menu-wrapper">
        <div className="menu-header">
            <h2>NIIY</h2>
            <img src="https://thorntons-investments.co.uk/wp-content/uploads/2017/08/400x200.png" alt="" />
        </div>
        <div className="menu-items-wrapper">
            <div className="menu-item button">
                <span className="label">Click me !</span>
            </div>
            <div className="menu-item slider">
                <span className="label">Fait ton choix</span>
                <input max={5} type="range" />
            </div>
            <div className="menu-item button">
                <span className="label">Click me !</span>
            </div>
        </div>
    </div> */}
    </>
  )
}

export default Menu
