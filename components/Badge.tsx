interface IProps {
  type?: "primary" | "success" | "warning" | "error" | "disabled";
  children?: any;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export default function Badge({
  type,
  children,
  className,
  onClick,
  title,
}: IProps) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`nes-badge ${title && "is-splited"}`}
    >
      {title && <span className="is-dark">{title}</span>}
      <span className={`${type ? `is-${type}` : ""} ${className || ""}`}>
        {children}
      </span>
    </a>
  );
}
