import React, { useState } from 'react';
import { createPixPayment } from './services/paymentService';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PaymentComponent = () => {
  const [qrCode, setQrCode] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleCreatePayment = async () => {
    const paymentData = {
      transaction_amount: 20,
      description: 'pagamento teste2',
      paymentMethodId: 'pix',
      email: 'gmail@teste.com',
      identificationType: 'cpf',
      number: '98765432100',
    };

    try {
      const qrCodeBase64 = await createPixPayment(paymentData);
      setQrCode(qrCodeBase64);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: "#000000" }}>
      <Card style={{border: "1px dashed #000000", padding: "10px"}} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Victor ALves"
        />
        <CardMedia
          component="img"
          height="350"
          image={qrCode ? `data:image/png;base64,${qrCode}` : ""}
          alt="Gerar QR Code de Pagamento"
          
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <div style={{ marginTop: '10%'  }}>
            <button onClick={handleCreatePayment}>Gerar QR Code</button>
          </div>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              QR CODE GERADO.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      
    </div>
  );
};

export default PaymentComponent;
