import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingButton from '../loadingButton';

function ModalConfirm({ 
    stateModal, 
    setStateModal, 
    title, 
    content, 
    onSearch, 
    setCustomer, 
    customer, 
    loading,
}) {
  const [error, setError] = useState({
    mobilePhone: {
        open: false,
        message: 'Celular obrigatório'
    }
  });

  useEffect(() => {
    if (!customer.mobilePhone) {
      setError((prevError) => ({
        mobilePhone: {
          ...prevError.mobilePhone,
          open: true,
        }
      }))
    } else {
      setError((prevError) => ({
        mobilePhone: {
          ...prevError.mobilePhone,
          open: false,
        }
      }))
    }
  }, [customer.mobilePhone]);

  const handleClose = () => {
    setStateModal((prevStateModal) => ({
        ...prevStateModal,
        modalSearch: false,
      }));
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
            required
            error={error.mobilePhone.open}
            helperText={error.mobilePhone.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            color='primary'
            titleButton='Confirmar'
            onClick={onSearch}
          /> 
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalConfirm;
