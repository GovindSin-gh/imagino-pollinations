const genBtn = document.querySelector('#generateBtn')
const promptIn = document.querySelector('#promptInput')
const resDiv = document.querySelector('.resultDiv')
const loader = document.querySelector('.loader')
const dwnBtn = document.querySelector('#downloadBtn')
const base_url = 'https://image.pollinations.ai/prompt/'
genBtn.onclick = () => {
    const prompt = promptIn.value.trim();
    if (prompt != '') {
        // Show loader
        resDiv.style.visibility = 'visible';
        loader.style.visibility = 'visible';
        // Fetch image from DeepAI
        const pic = `${base_url}${encodeURIComponent(prompt)}`;
        const img = new Image();
        img.src = pic;
        // Once image loads, set as background
        img.onload = () => {
            loader.style.visibility = 'hidden';
            resDiv.style.backgroundImage = `url(${pic})`;
            resDiv.style.backgroundSize = 'cover';
            resDiv.style.backgroundRepeat = 'no-repeat';
            resDiv.style.backgroundPosition = 'center';
            dwnBtn.style.visibility = 'visible';

            // Setup download
            dwnBtn.onclick = async () => {
                try {
                    const response = await fetch(pic, { mode: 'cors' });
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'pollinations-image.jpg';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    // Cleanup
                    URL.revokeObjectURL(url);
                } catch (err) {
                    alert("Failed to download image.");
                    console.error(err);
                }
            };

        };

        img.onerror = () => {
            loader.style.visibility = 'hidden';
            resDiv.innerText = 'Could not load image. Try again.';
        };
    }
}