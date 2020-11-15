interface IProps {
  type?: "primary" | "success" | "warning" | "error" | "disabled";
  children?: any;
  className?: string;
  onClick?: () => void;
}

export default function Button({ type, children, className, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`nes-btn ${type ? `is-${type}` : ""} ${className || ""}`}
    >
      {children}
    </button>
  );
}
