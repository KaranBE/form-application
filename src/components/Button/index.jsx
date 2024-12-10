
import PropTypes from 'prop-types'
const shapes = {
  round: 'rounded-md',
}
const variants = {
  outline: {
    teal: 'border-teal border border-solid text-teal',
  },
  fill: {
    cyan_800: 'bg-cyan-800 text-white',
  },
}
const sizes = {
  xs: 'h-[2.88rem] px-[2.13rem] text-[1.00rem]',
}
const Button = ({
  children,
  className,
  leftIcon,
  rightIcon,
  shape,
  variant = 'outline',
  size = 'xs',
  color = 'teal',
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center sm: px-[1.25rem] text-center cursor-pointer whitespace-nowrap tracking-[0.00rem] text-[1.00rem] font-bold rounded-md ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  )
}
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(['round']),
  size: PropTypes.oneOf(['xs']),
  variant: PropTypes.oneOf(['outline', 'fill']),
  color: PropTypes.oneOf(['teal', 'cyan_800']),
}
export {Button}
