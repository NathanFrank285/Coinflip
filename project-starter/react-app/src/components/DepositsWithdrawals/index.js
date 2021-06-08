import React, {useState} from "react";
import Modal from "react-modal";
import './DepositsWithdrawals.css'

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
function DepositsWithdrawals() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

const depositOrWithdrawal = (e) => {
  e.preventDefault();
  console.log('made it into the function')
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
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1 className="modalTitle">Would you like to Deposit or Withdrawal USD?</h1>
      <form onSubmit={(e)=>depositOrWithdrawal(e)}>
        <label className="formLabel">Quantity</label>
        <input type='number'/>
        <select >
          <option value='deposit'>Deposit</option>
          <option value='withdrawal'>Withdrawal</option>
        </select>

        <button type='submit'>Confirm</button>
      <button onClick={closeModal}>close</button>
      </form>
    </Modal>
  </div>
);
}


export default DepositsWithdrawals
