import classnames from 'classnames';

const Button = ({size, border, tracking, bgColor, mx, my, textColor, children, handleClick, borderColor, text, fontStyle, hoverColor, activeCursor, transition, px, py, duration, rotate, hide, activeText, bg, active, activeColor, hoverText, disabled}) => {

      return (
            <button className={classnames(`${borderColor} ${fontStyle} text-${textColor} ${tracking} ${mx} ${my} bg-${bgColor} ${bg} ${text} py-${py} px-${px} ${px} rounded ${border} ${hoverColor} hover:text-${hoverText} active:cursor-${activeCursor} ease-${transition} duration-${duration} hover:rotate-${rotate} ${activeColor} active:text-${activeText} ${disabled} ${hide}`, {
                  "text-xs": size === 'sm',
                  "text-xl": size === 'lg',

            })}
            onClick={handleClick}
            >
            {children}
            </button>
      )

};

export default Button;

