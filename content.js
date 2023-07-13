document.addEventListener('keyup', async function(event) {

  console.log(window.location.hostname);

  const tweetBox = document.querySelectorAll("textarea")[2]
  // const tweetBox = document.querySelector(".editable")
  // const tweetBox = document.querySelector('div[aria-label="Tweet text"]');
  if (event.key === 'Enter' && tweetBox) {
    const tweetContent = tweetBox.textContent.trim();
    console.log(tweetContent);
    const regex = /^\/y (.+)$/; // Match '/y ' followed by any text
    const match = tweetContent.match(regex);
      console.log({match});
    if (match) {
      console.log(tweetContent);
      event.preventDefault();
      const prompt = match[1]; // Extract the prompt text

      // Make API request to OpenAI
      const apiKey = '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'; // Replace with your OpenAI API key
      const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 50, // Adjust the desired length of the output
          temperature: 0.7 // Adjust the temperature for output randomness
        })
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log({data});
        const outputText = data.choices[0].text.trim();

        const insertText = outputText + ' '; // Add a space after the output
        const currentCursorPosition = tweetBox.selectionStart;
        const tweetBoxContent = tweetBox.innerText;

        const newTweetContent = insertText ;
        tweetBox.value = newTweetContent; // Use innerText instead of textContent
        tweetBox.focus();
        const newCursorPosition = currentCursorPosition + insertText.length;

        // Use a Range and Selection to set the cursor position
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(tweetBox.childNodes[0], newCursorPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        // tweetBox.setSelectionRange(newCursorPosition, newCursorPosition);

      } else {
        console.error('Failed to retrieve OpenAI response:', response.status, response.statusText);
      } 
    } else if (event.key === 'Backspace' && tweetBox) {
        const currentCursorPosition = tweetBox.selectionStart;
        const tweetBoxContent = tweetBox.innerText;

        // Check if the backspace key is pressed at the end of the inserted output
        if (currentCursorPosition === tweetBoxContent.length) {
          // Delete the last character
          const newTweetContent = tweetBoxContent.slice(0, currentCursorPosition - 1);
          tweetBox.innerText = newTweetContent;
          tweetBox.focus();

          // Calculate the new cursor position
          const newCursorPosition = currentCursorPosition - 1;

          // Use a Range and Selection to set the cursor position
          const range = document.createRange();
          const selection = window.getSelection();
          range.setStart(tweetBox.childNodes[0], newCursorPosition);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
    }
  }
});
