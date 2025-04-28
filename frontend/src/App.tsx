import { useState } from 'react'
import { Container, Typography, TextField, Button, Box, Paper, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from '@mui/material'
import { getRoot, getProtected, setApiKey, generateApiKey } from './services/api'

function App() {
  const [apiKey, setApiKeyInput] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [rootData, setRootData] = useState<any>(null)
  const [protectedData, setProtectedData] = useState<any>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleGetRoot = async () => {
    try {
      const data = await getRoot()
      setRootData(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch root endpoint')
      setRootData(null)
    }
  }

  const handleGetProtected = async () => {
    if (!apiKey) {
      setError('Please set an API key first')
      return
    }
    try {
      console.log('Sending API key:', apiKey)
      const data = await getProtected(apiKey)
      setProtectedData(data)
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to fetch protected endpoint. Make sure you have set a valid API key.')
      setProtectedData(null)
    }
  }

  const handleGenerateApiKey = async () => {
    try {
      const response = await generateApiKey()
      setGeneratedKey(response.api_key)
      setOpenDialog(true)
      setMessage(response.message)
      setError('')
    } catch (err) {
      setError('Failed to generate API key')
      setMessage('')
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (generatedKey) {
      setApiKeyInput(generatedKey)
      setApiKey(generatedKey)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          API Key Manager
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            API Key Management
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleGenerateApiKey}>
              Generate New Key
            </Button>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Root Endpoint
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleGetRoot} fullWidth>
                  Get Root
                </Button>
              </Box>
              {rootData && (
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <pre>{JSON.stringify(rootData, null, 2)}</pre>
                </Paper>
              )}
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Protected Endpoint
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="API Key"
                  value={apiKey}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleGetProtected} 
                  fullWidth
                  disabled={!apiKey}
                >
                  Get Protected
                </Button>
              </Box>
              {protectedData && (
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <pre>{JSON.stringify(protectedData, null, 2)}</pre>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Box>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>New API Key Generated</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your new API key is:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                {generatedKey}
              </Typography>
            </Paper>
            <Typography variant="body2" sx={{ mt: 2, color: 'error.main' }}>
              Please save this key as it won't be shown again!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  )
}

export default App
