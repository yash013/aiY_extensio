async function handleKeyup(event) {
  if (event.key === 'Enter') {
    const tweetBox = event.target;
    const tweetContent = event.target.textContent.trim();
    console.log('Element data:', event.target, tweetContent);
    const regex = /^\/y (.+)$/;
    const match = tweetContent.match(regex);
    console.log(match, tweetContent);
    if (match) {
      event.preventDefault();
      const prompt = match[1];

      const apiKey = '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';
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        const outputText = data.choices[0].text.trim();

        const newTweetContent = `/y ${prompt}\n${outputText}`;
        tweetBox.innerText = newTweetContent;
        tweetBox.focus();
      } else {
        console.error('Failed to retrieve OpenAI response:', response.status, response.statusText);
      }

    }
  }
}


const observer = new MutationObserver(function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        if (node instanceof HTMLElement && node.matches('.ql-editor')) {
          node.addEventListener('keyup', handleKeyup);
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
