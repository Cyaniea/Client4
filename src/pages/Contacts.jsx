import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';

function Contacts() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Hubungi Kami
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <InstagramIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Instagram:</Typography>
          <Link href="https://www.instagram.com/grahatrisilaofficial" target="_blank" sx={{ ml: 1 }}>
            @Grahatrilila
          </Link>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Email:</Typography>
          <Link href="mailto:grahatrisilaofficial@gmail.com" sx={{ ml: 1 }}>
            Grahatrilila@gmail.com
          </Link>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <WhatsAppIcon sx={{ mr: 1 }} />
          <Typography variant="h6">WhatsApp:</Typography>
          <Link href="https://wa.me/628112282845" target="_blank" sx={{ ml: 1 }}>
            +62 811-228-2845
          </Link>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Contacts;
