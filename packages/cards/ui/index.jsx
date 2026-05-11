import "./index.css";

/**
 * Card – container som grupperar relaterat innehåll med ram och bakgrund.
 *
 * Kombineras vanligen med `CardHeader`, `CardTitle`, `CardBody` och `CardFooter`
 * för en konsekvent struktur.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Kortets innehåll.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <Card>
 *   <CardHeader><CardTitle>Rubrik</CardTitle></CardHeader>
 *   <CardBody>Brödtext</CardBody>
 *   <CardFooter><Button>OK</Button></CardFooter>
 * </Card>
 */
export function Card({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardHeader – övre sektion i ett kort, ofta för rubrik och åtgärder.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardHeader({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__header ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardBody – huvudinnehållet i ett kort.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardBody({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__body ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardFooter – nedre sektion i ett kort, ofta för knappar eller metadata.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardFooter({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__footer ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardTitle – semantisk rubrik (h3) för ett kort.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardTitle({ children, className = "", ...rest }) {
  return (
    <h3 className={`fc-card__title ${className}`} {...rest}>
      {children}
    </h3>
  );
}
