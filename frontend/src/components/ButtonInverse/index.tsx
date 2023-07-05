import "./styles.css";

type Props = {
    text: string;
}

export default function ButtonInverse({text}: Props) {
  return (
    <div className="btn-inverse-container">
      <button className="btn btn-danger btn-icon">
        <h6>{text}</h6>
      </button>
    </div>
  );
}
