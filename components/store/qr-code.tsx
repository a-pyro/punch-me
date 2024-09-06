import QRCode from 'react-native-qrcode-svg'

import { createFidelityUrl } from '@/utils/qr-code'

export type StoreQRCodeProps = {
  storeId: string
  userId: string
}

export const StoreQRCode: React.FC<StoreQRCodeProps> = ({
  storeId,
  userId,
}) => {
  const fidelityUrl = createFidelityUrl({
    storeId,
    userId,
    action: 'requestPoints',
  })

  console.log({ fidelityUrl })
  return <QRCode size={200} value={fidelityUrl} />
}
