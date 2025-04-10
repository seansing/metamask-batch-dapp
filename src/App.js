import React from 'react';
import { config } from './config'
import { useAccount, useConnect, useSendTransaction } from 'wagmi';
import { useSendCalls } from 'wagmi/experimental'
import { parseEther } from 'viem'

function App() {
    const { sendCalls } = useSendCalls(
      {config}
    )

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { sendTransaction } = useSendTransaction();
  
      // Check if the user is connected to MetaMask
      if (!isConnected) {
        const handleConnect = async () => {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          } catch (error) {
            console.error('Failed to connect to MetaMask:', error);
          }
        };
  
        return (
          <button onClick={handleConnect}>Connect MetaMask</button>
        );
      } 

    const handleSendCalls = async () => {
      try {
        console.log("SENDER",address);
        // const tx = await sendTransaction({
        //   to: '0xc1490D19dD9fFA6912bC0349ebc7515E7bF0F5b1',
        //   value: parseEther('0.01'),
        // });


        const tx = await sendCalls({
          calls: [
            {
              to: '0xc1490D19dD9fFA6912bC0349ebc7515E7bF0F5b1',
              value: parseEther('0.01')
            },
            {
              to: '0x6b658aB751e633b64a92a78B33406B8aF5EA61C7',
              value: parseEther('0.01'),
            },
          ]
        });
  
        console.log('Transaction sent:', tx);
      } catch (error) {
        console.error('Transaction error:', error);
      }
    };
    return (
      <div>
        <h1>WAGMI Send Transaction with MetaMask</h1>
        <button onClick={handleSendCalls}>
          Send calls
        </button>
      </div>
    );
}

export default App
