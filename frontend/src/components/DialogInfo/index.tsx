import "./styles.css";

type Props = {
  message: string;
  onDialogClose: Function;
};

export default function DialogInfo({ message, onDialogClose }: Props) {
  return (
    <div className="modal-background" onClick={() => onDialogClose()}>
      <div
        className="modal-box d-flex-row align-items-center modal-box-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="text-center">{message}</h5>
        <div className="btn-dialog-info" onClick={() => onDialogClose()}>
          <button className="btn btn-secondary w-100">OK</button>
        </div>
      </div>
    </div>
  );
}
