import classnames from 'classnames';

const List = ({ handleClick, children, px, py }) => {
      return (
            <li className={classnames(`cursor-pointer hover:text-neutral-300 hover:underline hover:underline-offset-8 hover:decoration-neutral-400 text-black font-gideon px-${px} py-${py}`)}
            onClick={handleClick}>
            {children}
            </li>
      )
}

export default List;