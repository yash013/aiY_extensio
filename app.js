async function handleKeyup(event) {
  if (event.key === "Enter") {
    const tweetBox = event.target;
    const tweetContent = event.target.textContent.trim();
    console.log("Element data:", event.target, tweetContent);
    const regex = /^\/y (.+)$/;
    const match = tweetContent.match(regex);
    if (match) {
      event.preventDefault();
      const prompt = match[1];

      try {
        const apiKey = "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"; 
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.41,
              max_tokens: 2072,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            }),
          }
        );
        // const apiKey = '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';
        // const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${apiKey}`
        //   },
        //   body: JSON.stringify({
        //     prompt: prompt,
        //     max_tokens: 2048,
        //     temperature: 0.3
        //   })
        // });

        if (response.ok) {
          const data = await response.json();
          console.log({ data });
          const outputText = data.choices[0].message.content;

          const newTweetContent = `/y ${prompt}\n${outputText}`;
          // Check if the tweet box has an input element
          const inputElement = tweetBox.querySelector("input");
          if (inputElement) {
            inputElement.value = newTweetContent;
          } else {
            // If no input element found, fallback to setting the textContent
            tweetBox.textContent = newTweetContent;
          }

          // Trigger the 'input' event to update the UI
          tweetBox.dispatchEvent(new Event("input", { bubbles: true }));

          // tweetBox.innerText = newTweetContent;
          tweetBox.focus();
        } else {
          console.error(
            "Failed to retrieve OpenAI response:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}

const selector = {
  ["twitter.com"]: "div[data-editor] > div > span ",
  ["www.linkedin.com"]: ".ql-editor",
  ["wordpress.com"]: ".wp-block-post-content",
  ["mail.google.com"]: "table",
  ["www.reddit.com"]: "table",
  ["medium.com"]: ".defaultValue",
};

const observer = new MutationObserver(function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        if (
          node instanceof HTMLElement &&
          node.matches(selector[window.location.hostname])
        ) {
          switch (window.location.hostname) {
            case "mail.google.com":
              document
                .querySelector("div.editable")
                .addEventListener("keyup", handleKeyup);
              break;
            default:
              node.addEventListener("keyup", handleKeyup);
              break;
          }
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
