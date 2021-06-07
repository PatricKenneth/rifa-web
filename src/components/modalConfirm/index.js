import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ModalConfirm({ stateModal, setStateModal, title, content, onFinish, setCustomer, customer }) {
  const handleClose = () => {
    setStateModal(false);
  };

  return (
    <div>
      <Dialog open={stateModal} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Nome'
            fullWidth
            autoComplete='off'
            value={customer.name}
            onChange={(event) => setCustomer((prevCustomer) => ({
              ...prevCustomer,
              name: event.target.value,
            }))}
          />
           <TextField
            margin='dense'
            id='lastName'
            label='Sobrenome'
            fullWidth
            autoComplete='off'
            value={customer.lastname}
            onChange={(event) => setCustomer((prevCustomer) => ({
              ...prevCustomer,
              lastname: event.target.value,
            }))}
          />
           <TextField
            margin='dense'
            id='mobilePhone'
            label='Celular'
            fullWidth
            autoComplete='off'
            value={customer.mobilePhone}
            onChange={(event) => setCustomer((prevCustomer) => ({
              ...prevCustomer,
              mobilePhone: event.target.value,
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={onFinish} color='primary'>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalConfirm;
