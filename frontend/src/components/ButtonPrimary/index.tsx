import './styles.css';

import {ReactComponent as ArrowIcon} from '../../assets/icons/arrow.svg';

type Props = {
    text: string;
}

export default function ButtonPrimary({text}: Props) {
  return (
    <div className="btn-container">
      <button className="btn btn-secondary btn-icon">
        <h6>{text}</h6>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
}
