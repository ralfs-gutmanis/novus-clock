import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

function Confirmation(props) {
  if (!props.visible) {
    return '';
  }

  const reverse = props.reverse ? 'reverse' : '';

  return (
    <div
      className="modal-container"
      onClick={() => props.onCancel()}
      role="presentation"
    >
      <div
        className={`modal-content ${reverse}`}
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        <p>{props.message}</p>
        <button
          className="form-button save"
          onClick={(e) => { e.stopPropagation(); props.onConfirm(); }}
        >
            YES
        </button>
        <button
          className="form-button cancel"
          onClick={(e) => { e.stopPropagation(); props.onCancel(); }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

Confirmation.propTypes = {
  message: PropTypes.number.isRequired,
  visible: PropTypes.bool,
  reverse: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Confirmation.defaultProps = {
  visible: false,
  reverse: false,
};

export default Confirmation;
