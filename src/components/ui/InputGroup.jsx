// import React, { useState } from "react";
// import Icon from "@/components/ui/Icon";
// import Cleave from "cleave.js/react";
// import "cleave.js/dist/addons/cleave-phone.us";

import { useState } from "react";

// const InputGroup = ({
//   type,
//   label,
//   placeholder,
//   classLabel = "form-label",
//   className = "",
//   classGroup = "",
//   register,
//   name,
//   readonly,
//   value,
//   error,
//   icon,
//   disabled,
//   id,
//   horizontal,
//   validate,
//   isMask,
//   msgTooltip,
//   description,
//   hasicon,
//   onChange,
//   merged,
//   append,
//   prepend,
//   options,
//   onFocus,

//   ...rest
// }) => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   return (
//     <div
//       className={`  ${horizontal ? "flex" : ""} 
//       ${merged ? "merged" : ""}  `}
//     >
//       {label && (
//         <label
//           htmlFor={id}
//           className={`block capitalize ${classLabel}  ${
//             horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
//           }`}
//         >
//           {label}
//         </label>
//       )}
//       <div
//         className={`flex items-stretch inputGroup 
      
        
//     ${append ? "has-append" : ""}
//     ${prepend ? "has-prepend" : ""}

//     ${error ? "is-invalid" : ""}  ${validate ? "is-valid" : ""}
    
   
//     ${horizontal ? "flex-1" : ""}
//       `}
//       >
//         {/* prepend*/}
//         {prepend && (
//           <span className="flex-none input-group-addon">
//             <div className="input-group-text  h-full prepend-slot">
//               {prepend}
//             </div>
//           </span>
//         )}
//         <div className="flex-1">
//           <div
//             className={`relative fromGroup2
//           ${error ? "has-error" : ""} 
//            ${validate ? "is-valid" : ""}
//           `}
//           >
//             {name && !isMask && (
//               <input
//                 type={type === "password" && open === true ? "text" : type}
//                 {...register(name)}
//                 {...rest}
//                 className={`${
//                   error ? " has-error" : " "
//                 } input-group-control block w-full focus:outline-none py-2 ${className}  `}
//                 placeholder={placeholder}
//                 readOnly={readonly}
//                 disabled={disabled}
//                 id={id}
//                 onChange={onChange}
//               />
//             )}
//             {!name && !isMask && (
//               <input
//                 type={type === "password" && open === true ? "text" : type}
//                 className={`input-group-control block w-full focus:outline-none py-2 ${className}`}
//                 placeholder={placeholder}
//                 readOnly={readonly}
//                 disabled={disabled}
//                 onChange={onChange}
//                 id={id}
//               />
//             )}
//             {name && isMask && (
//               <Cleave
//                 {...register(name)}
//                 {...rest}
//                 placeholder={placeholder}
//                 options={options}
//                 className={`${
//                   error ? " has-error" : " "
//                 } input-group-control w-full py-2 ${className}  `}
//                 onFocus={onFocus}
//                 id={id}
//                 readOnly={readonly}
//                 disabled={disabled}
//                 onChange={onChange}
//               />
//             )}
//             {!name && isMask && (
//               <Cleave
//                 placeholder={placeholder}
//                 options={options}
//                 className={`${
//                   error ? " has-error" : " "
//                 } input-group-control w-full py-2 ${className}  `}
//                 onFocus={onFocus}
//                 id={id}
//                 readOnly={readonly}
//                 disabled={disabled}
//                 onChange={onChange}
//               />
//             )}
//             {/* icon */}
//             <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
//               {hasicon && (
//                 <span
//                   className="cursor-pointer text-secondary-500"
//                   onClick={handleOpen}
//                 >
//                   {open && type === "password" && (
//                     <Icon icon="heroicons-outline:eye" />
//                   )}
//                   {!open && type === "password" && (
//                     <Icon icon="heroicons-outline:eye-off" />
//                   )}
//                 </span>
//               )}

//               {error && (
//                 <span className="text-danger-500">
//                   <Icon icon="heroicons-outline:information-circle" />
//                 </span>
//               )}
//               {validate && (
//                 <span className="text-success-500">
//                   <Icon icon="bi:check-lg" />
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* append*/}
//         {append && (
//           <span className="flex-none input-group-addon right">
//             <div className="input-group-text  h-full append-slot">{append}</div>
//           </span>
//         )}
//       </div>
//       {/* error and success message*/}
//       {error && (
//         <div
//           className={` mt-2 ${
//             msgTooltip
//               ? " inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
//               : " text-danger-500 block text-sm"
//           }`}
//         >
//           {error.message}
//         </div>
//       )}
//       {/* validated and success message*/}
//       {validate && (
//         <div
//           className={` mt-2 ${
//             msgTooltip
//               ? " inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded"
//               : " text-success-500 block text-sm"
//           }`}
//         >
//           {validate}
//         </div>
//       )}
//       {/* only description */}
//       {description && <span className="input-description">{description}</span>}
//     </div>
//   );
// };

// export default InputGroup;


const InputGroup = ({
  type,
  label,
  placeholder,
  classLabel = "form-label",
  className = "",
  value, // <-- Add value prop
  onChange, // <-- Add onChange handler
  id,
  readonly,
  disabled,
  horizontal,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={` ${horizontal ? "flex" : ""}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize ${classLabel} ${
            horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex items-stretch inputGroup">
        <div className="flex-1">
          <div className="relative fromGroup2">
            <input
              type={type === "password" && open ? "text" : type}
              className={`input-group-control block w-full focus:outline-none py-2 ${className}`}
              placeholder={placeholder}
              readOnly={readonly}
              disabled={disabled}
              value={value || ""} // <-- Ensure value is passed and reset to empty string when needed
              onChange={onChange} // <-- Handle input change
              id={id}
              {...rest}
            />
            {/* Icon */}
            <div className="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">
              {type === "password" && (
                <span onClick={handleOpen}>
                  {open ? <Icon icon="heroicons-outline:eye" /> : <Icon icon="heroicons-outline:eye-off" />}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InputGroup