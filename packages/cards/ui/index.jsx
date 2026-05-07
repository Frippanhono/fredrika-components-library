import "./index.css";

export function Card({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__header ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__body ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__footer ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...rest }) {
  return (
    <h3 className={`fc-card__title ${className}`} {...rest}>
      {children}
    </h3>
  );
}
