import React, {useState} from "react";
import Modal from "react-modal";

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

function afterOpenModal() {
  subtitle.style.color = "#f00";
}

function closeModal() {
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
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form onSubmit={(e)=>depositOrWithdrawal(e)}>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button type='submit'>the modal</button>
      </form>
    </Modal>
  </div>
);
}


export default DepositsWithdrawals
