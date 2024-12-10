import React from 'react'
import Select from 'react-select'
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
  xs: 'h-[3.13rem] px-[0.88rem] text-[1.13rem]',
}
const SelectBox = React.forwardRef(
  (
    {
      children,
      className,
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      shape,
      variant = 'outline',
      size = 'xs',
      color = 'outline',
      ...restProps
    },
    ref,
  ) => {
    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} flex ${shape && shapes[shape]} ${
            size && sizes[size]
          } ${variant && variants[variant]?.[color]}`}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && {DropdownIndicator: () => indicator}),
          }}
          styles={{
            indicatorsContainer: (provided) => ({
              ...provided,
              padding: undefined,
              flexShrink: undefined,
              width: 'max-content',
              '&> div': {padding: 0},
            }),
            container: (provided) => ({
              ...provided,
              zIndex: 0,
              alignItems: 'center',
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: 'transparent',
              border: '0 !important',
              boxShadow: 'none !important',
              minHeight: 'auto',
              width: '100%',
              flexWrap: undefined,
              '&:hover': {
                border: '0 !important',
              },
            }),
            input: (provided) => ({
              ...provided,
              color: 'inherit',
            }),
            option: (provided, state) => ({
              ...provided,
              display: 'flex',
              minWidth: 'max-content',
              width: '100%',
              backgroundColor: state.isSelected ? '#127c95' : 'transparent',
              color: state.isSelected ? '#ffffff' : 'inherit',
              '&:hover': {
                backgroundColor: '#127c95',
                color: '#ffffff',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              display: 'flex',
              marginLeft: undefined,
              marginRight: undefined,
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
              display: 'flex',
              flexWrap: undefined,
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menuPortal: (base) => ({...base, zIndex: 999999}),
            menu: (base) => ({
              ...base,
              minwidth: 'max-content',
              width: 'max-content',
            }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event) => {
            return event.target.id === 'scrollContainer'
          }}
          {...restProps}
        />
        {children}
      </>
    )
  },
)

SelectBox.displayName = 'SelectBox'

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  shape: PropTypes.oneOf(['round']),
  size: PropTypes.oneOf(['xs']),
  variant: PropTypes.oneOf(['outline']),
  color: PropTypes.oneOf(['outline']),
  children: PropTypes.node,
}
export {SelectBox}
