import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingButton from '../loadingButton';

function ModalPaid({ 
    stateModal, 
    setStateModal, 
    title, 
    content, 
    onFinish, 
    setCustomer, 
    customer, 
    loading,
}) {
  const [error, setError] = useState({
    name: {
        open: false,
        message: 'Nome obrigatório'
    },
    lastName: {
        open: false,
        message: 'Sobrenome obrigatório'
    },
    mobilePhone: {
        open: false,
        message: 'Celular obrigatório'
    }
  });

  useEffect(() => {
    if (!customer.name) {
      setError((prevError) => ({
        ...prevError,
        name: {
          ...prevError.name,
          open: true,
        }
      }))
    } else {
      setError((prevError) => ({
        ...prevError,
        name: {
          ...prevError.name,
          open: false,
        }
      }))
    }

    if (!customer.lastName) {
      setError((prevError) => ({
        ...prevError,
        lastName: {
          ...prevError.lastName,
          open: true,
        }
      }))
    } else {
      setError((prevError) => ({
        ...prevError,
        lastName: {
          ...prevError.lastName,
          open: false,
        }
      }))
    }
    
    if (!customer.mobilePhone) {
      setError((prevError) => ({
        ...prevError,
        mobilePhone: {
          ...prevError.mobilePhone,
          open: true,
        }
      }))
    } else {
      setError((prevError) => ({
        ...prevError,
        mobilePhone: {
          ...prevError.mobilePhone,
          open: false,
        }
      }))
    }
  }, [customer.name, customer.lastName, customer.mobilePhone]);

  const handleClose = () => {
    setStateModal((prevStateModal) => ({
      ...prevStateModal,
      modalPaid: false,
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
            required
            error={error.name.open}
            helperText={error.name.message}
          />
           <TextField
            margin='dense'
            id='lastName'
            label='Sobrenome'
            fullWidth
            autoComplete='off'
            value={customer.lastName}
            onChange={(event) => setCustomer((prevCustomer) => ({
              ...prevCustomer,
              lastName: event.target.value,
            }))}
            required
            error={error.lastName.open}
            helperText={error.lastName.message}
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
            onClick={onFinish}
          /> 
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPaid;
