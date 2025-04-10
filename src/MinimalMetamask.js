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

      // Batch calls to dummy addresses
      console.log("SENDER", account[0]);
      console.log(chainId)

      const params = {
        version: "1.0",
        from: account[0],
        chainId: chainId,
        atomicRequired: true,
        calls: [
          {
            to: "0x6b658aB751e633b64a92a78B33406B8aF5EA61C7",
            value: ethToHexWei(0.01), 
          },
          // {
          //   to: "0x6b658aB751e633b64a92a78B33406B8aF5EA61C7",
          //   value: ethToHexWei(0.01), 
          // }
        ]
      }

      // const tx1 = {
      //   to: '0xc1490D19dD9fFA6912bC0349ebc7515E7bF0F5b1',
      //   from: account[0],
      //   value: ethToHexWei(0.01), 
      // }

      // const result = await window.ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [tx1],
      // })
      
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
      <h2>MetaMask wallet_sendCalls Test</h2>
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
