interface IProps {
  children?: any;
  title?: string;
  className?: string;
}

export default function Container({ children, title, className }: IProps) {
  return (
    <div
      className={`nes-container ${title && "with-title"} ${className || ""}`}
    >
      {title && <h3 className="title">{title}</h3>}
      {children}
    </div>
  );
}
