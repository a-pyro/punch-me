const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const dotenv = require('dotenv')

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces()
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return null
}

const ip = getLocalIpAddress()
const envFilePath = path.resolve(__dirname, '../.env.local')

// Load existing environment variables
const envConfig = dotenv.parse(fs.readFileSync(envFilePath))

// Update the specific environment variable
if (ip) {
  envConfig['EXPO_PUBLIC_API_URL'] = `http://${ip}:8000/api`
  console.log(
    `Local IP address found: ${ip}. Updated EXPO_PUBLIC_API_URL in .env file.`,
  )
} else {
  console.error('Could not find a local IP address.')
}

// Convert the envConfig object back to the .env file format
const updatedEnvContent = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// Write the updated environment variables back to the .env file
fs.writeFileSync(envFilePath, updatedEnvContent, { encoding: 'utf8' })
