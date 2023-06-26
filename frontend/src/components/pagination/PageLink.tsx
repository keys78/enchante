import { HTMLProps } from 'react';

export type Props = HTMLProps<HTMLSpanElement> & { active?: boolean };

export default function PageLink({ active, disabled, children, ...otherProps }: Props) {
  const customClassName = `page-link ${otherProps.className || ''}${
    active ? ' active' : ''
  }${disabled ? ' disabled' : ''}`;

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <span className={customClassName} aria-current={active ? 'page' : undefined} {...otherProps}>
      {children}
    </span>
  );
}
