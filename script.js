// Add this function if it's missing
const generateResponse = async (userMessage) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return 'An error occurred while generating the response.';
    }
}; 