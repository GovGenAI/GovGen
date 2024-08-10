import { Canister, query, text } from 'azle';

// stable variable to store responses
let storedResponses: string[] = stable([]);

// Send the request to Bittensor and store the response on the Internet Computer
export default Canister({
    submitRequest: update([text], text, async (prompt) => {
        const response = await sendToBittensor(prompt);
        await storeOnICP(response);
        return response;
    })
});

async function sendToBittensor(prompt: string): Promise<string> {
    const response = await fetch('https://api.bittensor.com/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.result;
}

async function storeOnICP(response: string): Promise<void> {
    storedResponses.push(response);
    console.log(`Storing response on ICP: ${response}`);
}