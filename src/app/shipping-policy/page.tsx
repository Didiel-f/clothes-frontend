import { Box, Container, Typography, Paper } from '@mui/material';

export default function ShippingPolicyPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h1" sx={{ mb: 3 }}>Política de Envío</Typography>
        
        <Typography variant="h2" sx={{ mb: 2 }}>¿Cuándo será procesado mi pedido?</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Todos los pedidos se manejan y se envían desde nuestro almacén en San Fernando. Por favor, espere un 
          tiempo adicional para que su pedido sea procesado durante las vacaciones y las temporadas de rebajas. 
          Procesamos pedidos de lunes a viernes. Los pedidos se procesarán dentro de 2-3 días hábiles a partir 
          de la fecha del pedido y se enviarán al día siguiente después del día de procesamiento. Tenga en cuenta 
          que no enviamos los fines de semana.
        </Typography>

        <Typography variant="h2" sx={{ mb: 2 }}>¿Cuánto tiempo llevará recibir mi pedido?</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Una vez que realice su pedido, espere de 3 a 5 días hábiles para procesar sus pedidos. Después de eso, 
          tomará entre 2 y 4 días hábiles para la entrega en Chile (según la ubicación).
        </Typography>

        <Box sx={{ 
          p: 3, 
          bgcolor: 'primary.50', 
          borderRadius: 2, 
          border: '1px solid',
          borderColor: 'primary.200',
          mt: 4
        }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Resumen de Tiempos de Entrega
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
            <li><strong>Procesamiento:</strong> 2-3 días hábiles</li>
            <li><strong>Envió:</strong> Al día siguiente del procesamiento</li>
            <li><strong>Entrega en Chile:</strong> 2-4 días hábiles adicionales</li>
            <li><strong>Tiempo total estimado:</strong> 5-8 días hábiles</li>
          </Box>
        </Box>

        <Box sx={{ 
          p: 3, 
          bgcolor: 'warning.50', 
          borderRadius: 2, 
          border: '1px solid',
          borderColor: 'warning.200',
          mt: 3
        }}>
          <Typography variant="h6" color="warning.dark" gutterBottom>
            Información Importante
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
            <li>Los pedidos se procesan de lunes a viernes únicamente</li>
            <li>No realizamos envíos los fines de semana</li>
            <li>Durante vacaciones y temporadas de rebajas, los tiempos pueden extenderse</li>
            <li>Todos los envíos se realizan desde San Fernando, Chile</li>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
