interface IProps {
  headers: string[];
  data: string[][];
  className?: string;
}

export default function Container({ headers, data, className }: IProps) {
  return (
    <div className={`nes-table-responsive ${className || ""}`}>
      <table className="nes-table is-bordered is-centered">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => {
            return (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={`c-${i}-${j}`}>{c}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
