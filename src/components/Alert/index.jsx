import { Heading } from "../Heading";
import CheckedIcon from "../../assets/ic_outline-info.svg";
import ErrorIcon from "../../assets/x-circle.svg";
import PropTypes from "prop-types";
export const Alert = ({ type }) => {
  return (
    <div
      className={`absolute top-[95] right-[65px] md:right-[5px] md:max-w-[35%] md:absolute sm:max-w-[80%] sm:left-[50px] sm:top-[650px] ml-[-2.25rem] mt-[2.88rem] flex w-[32%] items-center gap-[0.63rem] rounded px-[2.00rem] py-[1.5rem] md:ml-0 md:w-full sm:p-[1.25rem] ${
        type === "success" ? "bg-green-a100" : "bg-[#f0c2c0] opacity-0.5"
      }`}
    >
      <img
        src={type === "success" ? CheckedIcon : ErrorIcon}
        alt={type === "success" ? "account created." : "account not created."}
      />
      <Heading
        size="headingmd"
        as="h6"
        className="text-[1.13rem] font-bold text-grey_7"
      >
        {type === "success"
          ? "User account successfully created."
          : "There was an error creating the account."}
      </Heading>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
};
