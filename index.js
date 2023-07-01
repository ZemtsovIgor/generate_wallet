const util = require('ethereumjs-util')
const { hdkey } = require('ethereumjs-wallet')
const bip39 = require('bip39')

// Generate mnemonic and seed
const mnemonic = bip39.generateMnemonic()
console.log('mnemonic', mnemonic)

bip39.mnemonicToSeed(mnemonic).then((bytes) => {
  console.log('bytes', bytes)
  console.log('Seed: ', bytes.toString('hex'));
  return hdkey.fromMasterSeed(bytes)
}).then((hdWallet) => {
  console.log('hdWallet', hdWallet)
  const masterPrivateKey = hdWallet._hdkey._privateKey.toString('hex');
  console.log('masterPrivateKey: ' + masterPrivateKey);

  const masterpublicKey = hdWallet._hdkey._publicKey.toString('hex');
  console.log('masterpublicKey: ' + masterpublicKey);

  return hdWallet.derivePath("m/44'/60'/0'/0/0")
}).then((key1) => {
  console.log('key1', key1)

  // Wallet from public Extended key and derive children
  const address1 = util.pubToAddress(key1._hdkey._publicKey, true)
  console.log('address1', address1)

  const address1Hex = address1.toString('hex')
  console.log('address1Hex', address1Hex)

  const address2 = util.toChecksumAddress(`0x${address1Hex}`)
  console.log('address2', address2)
})



