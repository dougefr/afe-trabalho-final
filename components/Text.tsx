interface IProps {
  type?: "primary" | "success" | "warning" | "error" | "disabled";
  children?: any;
  className?: string;
  onClick?: () => void;
}

export default function Text({ type, children, className, onClick }: IProps) {
  return (
    <span
      onClick={onClick}
      className={`nes-text ${type ? `is-${type}` : ""} ${className || ""}`}
    >
      {children}
    </span>
  );
}
