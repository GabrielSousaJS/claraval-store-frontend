import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  function handleGoToBack() {
    navigate("/");
  }

  return (
    <div className="modal-box text-end">
      <h1 className="text-center">Página não encontrada</h1>
      <button className="btn btn-secondary" onClick={handleGoToBack}>
        PÁGINA PRINCIPAL
      </button>
    </div>
  );
}
