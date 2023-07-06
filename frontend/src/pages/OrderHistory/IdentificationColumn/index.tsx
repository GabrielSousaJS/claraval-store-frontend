import "./styles.css";

export default function IdetificationColumn() {
    return (
        <div className="base-card d-md-block identification-container">
            <div className="row">
                <h3 className="col-3 m-0">Itens</h3>
                <h3 className="col-3 m-0 text-center">Data</h3>
                <h3 className="col-3 m-0 text-center">Valor total</h3>
                <h3 className="col-3 m-0 text-center">Situação</h3>
            </div>
        </div>
    );
}