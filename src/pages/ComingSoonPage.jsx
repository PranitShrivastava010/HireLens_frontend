import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '84%',
        minHeight: '80vh',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(240,244,255,1) 0%, rgba(243,232,255,1) 100%)',
        borderRadius: 4,
        margin: 2,
        padding: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(162,118,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,146,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <AutoAwesomeIcon sx={{ fontSize: 80, color: '#8b5cf6', mb: 3, filter: 'drop-shadow(0px 4px 8px rgba(139, 92, 246, 0.4))' }} />
        
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: {xs: 50, md: 80},
            fontWeight: 800, 
            background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Coming Soon
        </Typography>

        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
          We're working hard to bring this feature to life. It will be available very soon. Stay tuned!
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{
            background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(99, 102, 241, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 10px 4px rgba(99, 102, 241, .4)',
            }
          }}
        >
          Back to Dashboard
        </Button>
      </Container>
    </Box>
  );
};

export default ComingSoonPage;
