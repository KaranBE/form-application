import PropTypes from 'prop-types'
import { Button } from '../Button'

export const FormActions = ({ onSubmit, onCancel }) => {
  return (
    <div className="mx-[5.25rem] flex sm:flex-col gap-[1.00rem] md:mx-0">
      <Button
        shape="round"
        onClick={onCancel}
        className="w-full rounded-md !border px-[2.06rem] tracking-[0.00rem]">
        Cancel
      </Button>
      <Button
        color="cyan_800"
        variant="fill"
        shape="round"
        onClick={onSubmit}
        className="w-full rounded-md px-[2.13rem] tracking-[0.00rem] sm:px-[1.25rem]">
        Submit
      </Button>
    </div>
  )
}

FormActions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
