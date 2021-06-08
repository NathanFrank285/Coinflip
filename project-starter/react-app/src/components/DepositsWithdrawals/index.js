import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import './DepositsWithdrawals.css'
import { getDollarAmountThunk, newTransferThunk } from '../../store/accountUSD';

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #388186",
    backgroundColor: '#fdf6f6',
    height: 'fit-content'
  },
};

Modal.setAppElement("#root");

function DepositsWithdrawals() {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [transferQuantity, setTransferQuantity] = useState('');
  const [transferType, setTransferType] = useState('');

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

const depositOrWithdrawal = (e) => {
  e.preventDefault();
  const data = {
    transferQuantity,
    transferType,
  }

  dispatch(newTransferThunk(data))
  setIsOpen(false);

}
return (
  <div>
    <button className="despositWithdrawals" onClick={openModal}>
      Make a Deposit or Withdrawal
    </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      // style={customStyles}
      className="modal-container"
      contentLabel="Example Modal"
    >
      <h1 className="modalTitle">Would you like to Deposit or Withdraw USD?</h1>
      <label className="currentUSD">Current USD Balance: XXX</label>
      <form className="modalForm" onSubmit={(e) => depositOrWithdrawal(e)}>
        <label className="formLabel">Deposit or Withdrawal:</label>
        <select defaultValue="" onChange={(e)=>setTransferType(e.target.value)} className="formLabel">
          <option value="" disabled>
            Please select
          </option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>

        <label className="formLabel">Quantity:</label>
        <input
        className='formLabel'
        type="number"
        value={transferQuantity}
        onChange={(e)=>setTransferQuantity(e.target.value)}
        />

        <div className="modalFormButton-container">
          <button className="modalButton" type="submit">
            Confirm
          </button>
          <button className="modalButton" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  </div>
);
}


export default DepositsWithdrawals
