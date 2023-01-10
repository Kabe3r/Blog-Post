import classNames from "classnames";

const Input = ({type, children, handleRef ,bgColor, handleChange, placeholder, minLength, textColor}) => {

      return (
            <input type={type} className={classNames(`mb-2 p-2 rounded-lg text-${textColor} tracking-wide ${bgColor} focus:outline-none`)} minLength={minLength} onChange={handleChange} placeholder={placeholder} />

      )
}

export default Input;