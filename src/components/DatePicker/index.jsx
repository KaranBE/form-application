import { SelectBox } from "../SelectBox";

import PropTypes from "prop-types";
const MONTHS = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const DAYS = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1).padStart(2, "0"),
}));

const YEARS = Array.from({ length: 100 }, (_, i) => ({
  label: String(new Date().getFullYear() - i),
  value: String(new Date().getFullYear() - i),
}));
export const DatePicker = ({ onChange, values, errors }) => {
  return (
    <div className="flex gap-[1.50rem] self-stretch relative">
      <SelectBox
        shape="round"
        name="day"
        value={values.day}
        onChange={(value) => onChange({ target: { name: "day", value } })}
        options={DAYS}
        className={`w-full gap-[1.13rem] rounded !border px-[0.88rem] tracking-[0.00rem] sm:w-full ${
            errors.birthdate && !values.day
              ? "border-red-400"
              : ""
          }`}
        placeholder=""
      />
      {!values.day && (
        <span
          className="absolute left-[0.75rem] sm:text-xs top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]"
        >
          Day <span className="text-red-400">*</span>
        </span>
      )}
      <SelectBox
        shape="round"
        name="month"
        value={values.month}
        onChange={(value) => onChange({ target: { name: "month", value } })}
        options={MONTHS}
        className={`w-full gap-[1.13rem] rounded !border px-[0.88rem] tracking-[0.00rem] sm:w-full ${
            errors.birthdate && !values.month
              ? "border-red-400"
              : ""
          }`}
        placeholder=""
      />
      {!values.month && (
        <span
          className="absolute left-[9.95rem] sm:left-[120px] sm:text-xs top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]"
        >
          Month <span className="text-red-400">*</span>
        </span>
      )}
      <SelectBox
        shape="round"
        name="year"
        value={values.year}
        onChange={(value) => onChange({ target: { name: "year", value } })}
        options={YEARS}
        className={`w-full gap-[1.13rem] rounded !border px-[0.88rem] tracking-[0.00rem] sm:w-full ${
            errors.birthdate && !values.year
              ? "border-red-400"
              : ""
          }`}
        placeholder=""
      />
      {!values.year && (
        <span
          className="absolute left-[19.55rem] sm:left-[230px] sm:text-xs top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]"
        >
          Year <span className="text-red-400">*</span>
        </span>
      )}
    </div>
  );
};
DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
  errors: PropTypes.string,
};
