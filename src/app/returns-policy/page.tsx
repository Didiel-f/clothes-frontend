import { Box, Container, Typography, Paper } from '@mui/material';

export default function ReturnsPolicyPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h1" sx={{ mb: 3 }}>Política de Devoluciones y Reembolsos</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Tienes derecho a cancelar tu pedido dentro de los 30 días sin dar ninguna razón para hacerlo.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          El plazo para anular un pedido es de 30 días a partir de la fecha en que recibiste la mercancía o en el 
          que un tercero que hayas designado, que no sea el transportista, tome posesión del producto entregado.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Para ejercer tu derecho de cancelación, debes informarnos de tu decisión mediante una declaración clara.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Puedes informarnos por el correo electrónico contacto@zag.cl
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Te reembolsaremos a más tardar en 30 días a partir del día en que recibamos los bienes devueltos. 
          Usaremos el mismo medio de pago que utilizaste para el pedido y no incurrirás en ningún cargo por dicho reembolso.
        </Typography>

        <Typography variant="h2" sx={{ mb: 2 }}>Condiciones para devoluciones:</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Para que los bienes sean elegibles para una devolución, asegúrate de que:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <li>Se compraron en los últimos 30 días.</li>
          <li>Están en el embalaje original.</li>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Los siguientes bienes no se pueden devolver:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <li>El suministro de bienes hecho según tus especificaciones o claramente personalizado.</li>
          <li>El suministro de bienes que por su naturaleza no son aptos para ser devueltos, por ejemplo bienes que se deterioran rápidamente o cuya fecha de caducidad ha terminado.</li>
          <li>El suministro de bienes que no son aptos para devolución por razones de protección de la salud o higiene y que se abrieron después de la entrega.</li>
          <li>El suministro de bienes que, después de la entrega, según su naturaleza, se mezclan inseparablemente con otros artículos.</li>
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Nos reservamos el derecho de rechazar devoluciones de cualquier mercancía que no cumpla con las condiciones 
          de devolución anteriores a nuestro exclusivo criterio.
        </Typography>

        <Typography variant="h2" sx={{ mb: 2 }}>Devolución de bienes</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Eres responsable del costo y riesgo de devolvernos los bienes. Debes enviar los productos a la siguiente dirección:
        </Typography>

        <Box sx={{ 
          p: 2, 
          bgcolor: 'grey.100', 
          borderRadius: 1, 
          mb: 3,
          fontFamily: 'monospace'
        }}>
          El Roble 120 San Fernando - Chile
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          No nos hacemos responsables de los bienes dañados o perdidos en el envío de devolución. Por lo tanto, 
          recomendamos un servicio de correo asegurado y rastreable. No podemos emitir un reembolso sin la 
          recepción real de los bienes o la prueba de la devolución recibida.
        </Typography>

        <Typography variant="h2" sx={{ mb: 2 }}>Regalos:</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Si los productos se marcaron como regalo cuando se compraron y luego te los enviaron directamente, 
          recibirás un crédito de regalo por el valor de tu devolución. Una vez que se reciba el producto devuelto, 
          se te enviará por correo un certificado de regalo.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Si los productos no se marcaron como regalo cuando se compraron, o si el obsequiador se envió el pedido 
          a sí mismo para entregártelo luego, le enviaremos el reembolso al obsequiador.
        </Typography>

        <Typography variant="h2" sx={{ mb: 2 }}>Contáctanos</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Si tienes alguna pregunta sobre nuestra Política de devoluciones y reembolsos, comunícate con nosotros 
          por el correo electrónico contacto@zag.cl
        </Typography>
      </Paper>
    </Container>
  );
}
