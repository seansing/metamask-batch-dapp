import React from 'react';

function MinimalMetamask() {
  const sendBatchCalls = async () => {
    console.log(window.ethereum)
    if (!window.ethereum) {
      alert('MetaMask not found')
      return
    }

    try {
      let account = null;
      let chainId = null;
      try {
        account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        chainId = await window.ethereum.request({ method: 'eth_chainId' })
      } catch (err) {
        console.error(err)
        alert('Error: ' + err.message)
        return
      }

      try {
        const capabilities = await window.ethereum.request({
          method: 'wallet_getCapabilities',
          params: [account[0], ["0x2105"]]
          ,
        }).then((res) => {
          console.log("Capabilities", res);
        })
      } catch (err) {

      }      


      const params = {
        version: "2.0.0",
        from: account[0],
        chainId: chainId,
        atomicRequired: true,
        calls: [
          {
            to: "0x59859773a9E0bC355a525FE2f19A8417678E5C38",
            value: ethToHexWei(0.0001), 
          },
          {
            to: "0x760003aeb35c46Ca10B5112A2A8a0AD59d42356D",
            value: ethToHexWei(0.0001), 
          },
        ]
      }
      
      const result = await window.ethereum.request({
        method: 'wallet_sendCalls',
        params: [params],
      })

      console.log('Result:', result)
      alert('Batch call sent! Check console for result.')

    } catch (err) {
      console.error(err)
      alert('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>EIP-5792 wallet_sendCalls Test</h2>
      <button onClick={sendBatchCalls}>Send Batch Calls</button>
    </div>
  )
}

function ethToHexWei(ethAmount) {
  const wei = ethAmount * 1e18
  let hexString = wei.toString(16)
  return '0x' + hexString
}

export { MinimalMetamask }
