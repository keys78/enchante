import { useField, FieldAttributes, ErrorMessage } from 'formik';
import React, { TextareaHTMLAttributes } from 'react';

type textAreaProps = {
  label: string;
} & FieldAttributes<TextareaHTMLAttributes<HTMLTextAreaElement>>;

const TextArea: React.FC<textAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField<TextareaHTMLAttributes<HTMLTextAreaElement>>(props);
  return (
    <div className="mb-3 mt-4">
      <label
        className="text-sm sm:text-[16px] text-[14px] block"
        htmlFor={field.name}
      >
        {label}
      </label>
      <textarea
        className={`w-full sm:h-28 h-20 sm:text-[16px] text-[14px] px-2 py-2 block rounded resize-none border border-mediumGrey border-opacity-25 placeholder:opacity-50
       focus:outline-none focus:border-orangeSkin
        ${
          meta.touched &&
          meta.error &&
          ' border-2 border-opacity-100 border-mainRed'
        }`}
        {...field}
        {...props}
        autoComplete="off"
        ref={props.innerRef}
        name={props.name}
      />
      <ErrorMessage component="div" name={field.name} className="mt-2 text-[12px] text-red-500" />
    </div>
  );
};

export default TextArea; 
