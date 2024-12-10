import PropTypes from 'prop-types'
const sizes = {
  textxs: 'text-[0.75rem] font-normal',
  texts: 'text-[1.13rem] font-normal',
}
const Text = ({
  children,
  className = '',
  as,
  size = 'textxs',
  ...restProps
}) => {
  const Component = as || 'p'
  return (
    <Component
      // className={`text-red-400 font-lato ${className} ${sizes[size]} `}
      {...restProps}
    >
      {children}
    </Component>
  )
}


Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(sizes)),
}
export {Text}
