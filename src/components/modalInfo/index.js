import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ModalInfo({ 
    stateModal, 
    setStateModal, 
    title, 
    content, 
}) {

    const handleClose = () => {
    setStateModal((prevStateModal) => ({
      ...prevStateModal,
      modalInfo: false,
    }));
  };

  return (
    <div>
      <Dialog open={stateModal} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          {content.map((text, index) => 
            <DialogContentText key={index}>
              {text}
            </DialogContentText>
          )}
          <DialogContentText key='x' style={{ fontWeight: 'bold' }}>
            Enviar comprovante para:
          </DialogContentText>
          <DialogContentText key='link'>
               José Claudio: <a href='https://api.whatsapp.com/send?phone=5588988627931&text=Tire%20suas%20d%C3%BAvidas%3A' target="_blank" rel="noreferrer">(88) 9 8862-7931</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Fechar
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalInfo;
