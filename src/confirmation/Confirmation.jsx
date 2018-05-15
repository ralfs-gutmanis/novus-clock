import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

function Confirmation(props) {
  if (!props.visible) {
    return '';
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>{props.message}</p>
        <button
          className="form-button save"
          onClick={() => props.onConfirm()}
        >
            YES
        </button>
        <button
          className="form-button cancel"
          onClick={() => props.onCancel()}
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
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Confirmation.defaultProps = {
  visible: false,
};

export default Confirmation;
