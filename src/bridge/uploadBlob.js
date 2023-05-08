// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function arrayBufferToBase64 (buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  // window.btoa():将ascii字符串或二进制数据转换成一个base64编码过的字符串,该方法不能直接作用于Unicode字符串.
  return window.btoa(binary)
}
/**
* 流传输方法
*/
const transferBlob = function (resolve, reject, { blobStr, fileName, callback }) {
  const fnName = 'transferBlob' + new Date().getTime()
  let blocks = []
  let currIdnex = 0
  window[fnName] = function (res) {
    switch (res.result) {
      case 'nextBlock':
        try {
          currIdnex += 1
          parmasObject.body = arrayBufferToBase64(blocks[currIdnex])
          console.log('getFile-h5', parmasObject)
          window.bridge.transferBlob(JSON.stringify(parmasObject))
        } catch (e) {
          reject(e)
        }
        break
      case 'end':
        resolve(res)
        break
    }
  }
  const byteArray = getUint8ArrayBlob(blobStr)
  const parmasObject = {
    contentLength: byteArray.length,
    fileName: fileName,
    contentType: getMimeString(blobStr),
    callback: fnName
  }
  blocks = sliceUint8Array(byteArray)
  callback && callback.transfered && callback.transfered(parmasObject, byteArray, blocks)
  try {
    parmasObject.body = arrayBufferToBase64(blocks[currIdnex])
    console.log('getFile-h5', byteArray.length, '::' + blocks.length)
    window.bridge.transferBlob(JSON.stringify(parmasObject))
  } catch (e) {
    reject(e)
  }
}

function getUint8ArrayBlob (blobStr) {
  const byteString = atob(blobStr.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const blob = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    blob[i] = byteString.charCodeAt(i)
  }
  return blob
}

function getMimeString (blobStr) {
  return blobStr
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
}
function sliceUint8Array (byteArray) {
  const blocks = []
  let length = byteArray.length
  console.log('getFile-h5-length', length + '::=>' + length)
  while (length) {
    const startIdnex = byteArray.length - length
    const end = startIdnex + (length >= 65535 ? 65535 : length)
    const byteArrayBlock = byteArray.slice(startIdnex, end)
    length -= byteArrayBlock.length
    blocks.push(byteArrayBlock)
    console.log('getFile-h5-length', startIdnex + '::' + end)
  }
  return blocks
}
export default function (params) {
  return new Promise((resolve, reject) => {
    transferBlob(resolve, reject, params)
  })
}
