export const purifyHtml = (text: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, "text/html")

  let newText = ""
  const walk = (node: any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      newText += node.textContent
    } else {
      for (const childNode of node.childNodes) {
        walk(childNode)
      }
    }
  };
  walk(doc.body)

  const htmlEntities: any = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
  }

  newText = newText.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (match) => htmlEntities[match])

  return newText
}