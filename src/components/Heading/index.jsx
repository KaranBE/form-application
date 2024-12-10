import PropTypes from "prop-types"

const sizes = {
  headingxs: 'text-[0.88rem] font-bold',
  headings: 'text-[1.00rem] font-bold',
  headingmd: 'text-[1.13rem] font-bold',
  headinglg: 'text-[1.25rem] font-bold',
}
const Heading = ({
  children,
  className,
  size = 'headings',
  as,
  ...restProps
}) => {
  const Component = as || 'h6'
  return (
    <Component
      className={`text-grey_7 font-lato ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  )
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['headingxs', 'headings', 'headingmd', 'headinglg']),
  as: PropTypes.elementType,
}
export {Heading}
