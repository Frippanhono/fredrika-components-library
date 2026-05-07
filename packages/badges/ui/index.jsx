import "./index.css";

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  ...rest
}) {
  return (
    <span
      className={`fc-badge fc-badge--${variant} fc-badge--${size} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
