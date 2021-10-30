import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import Content from '../content';
import Header from '../header';
import Footer from '../footer';

function PageLayout() {
     const [open, setOpen] = useState(true);
     const handleClose = () => setOpen(false);
     return (
          <Box style={{ padding: '24px 40px 40px 40px', background: '#dedede' }}>
               <Header />
               <Content />
               <Footer />
               <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Informação</DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              Por falta de venda dos numeros o sorteio sera remarcado. Assim que vender todos 
                              os numeros sera marcado a data do sorteio! Desculpa o transtorno!
                              Qualquer dúvida entrar em contato. Obrigado pela compreenssão!
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose} color='secondary'>
                         Fechar
                         </Button>
                    </DialogActions>
               </Dialog>
          </Box>
     )
}

export default PageLayout;