import React from 'react'
import PropTypes from 'prop-types'
const shapes = {
  round: 'rounded',
}
const variants = {
  outline: {
    outline: 'border-outline border border-solid text-blue_gray-700',
  },
}
const sizes = {
  xs: 'h-[3.13rem] px-[0.75rem] text-[1.13rem]',
}
const Input = React.forwardRef(
  (
    {
      className = '',
      name = '',
      placeholder,
      type = 'text',
      label = '',
      prefix,
      suffix,
      onChange,
      shape,
      variant = 'outline',
      size = 'xs',
      color = 'outline',
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text tracking-[0.00rem] text-[1.13rem] border-outline border border-solid rounded ${
          shape && shapes[shape]
        } ${variant && (variants[variant]?.[color] || variants[variant])} ${
          size && sizes[size]
        }`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    )
  },
)

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(['round']),
  size: PropTypes.oneOf(['xs']),
  variant: PropTypes.oneOf(['outline']),
  color: PropTypes.oneOf(['outline']),
}
export {Input}
