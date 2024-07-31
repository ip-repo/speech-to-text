let micAccess;
const selectLanguage = document.getElementById('lang-box');
const textArea = document.getElementById('text-area');
const explanation = document.getElementById('explanation');
const allParagraphs = document.querySelectorAll('p')

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Check for speech recognition support in the browser
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
        // If not supported, disable relevant elements and show a message
        const settings = document.getElementById('settings-image');
        const clear = document.getElementById('clear-image');
        const download = document.getElementById('download-image');
        const recognize = document.getElementById('speech-image');
        textArea.value = "This browser do not support speech recognition. Try with chrome or edge."
        
        settings.onclick = null;
        clear.onclick = null;
        download.onclick = null;
        recognize.onclick = null;
        settings.style.opacity = 0.5;
        clear.style.opacity = 0.5;
        download.style.opacity = 0.5;
        recognize.style.opacity = 0.5;

        textArea.disabled = true;
        alert('Speech recognition is not supported in this browser.');
        return;
    } 
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            micAccess = true;
            console.info('Microphone access granted.');
            // Stop the stream to free up resources
            stream.getTracks().forEach(track => track.stop());
        })
        .catch(function(err) {
            micAccess = false;
            console.error('Microphone access denied:', err);
            
        });
        // Populate the language selection dropdown
        Object.keys(languageDict).forEach(lang => {
            try {
                speechRecognition.lang = lang;
              
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = lang;
                selectLanguage.appendChild(option);
            } catch (error) {
                
                delete languageDict[lang];
                delete languageDict[lang]
            }
        });
        // Set default language and update explanation text
        selectLanguage.value = 'en-US';
        explanation.innerHTML =`This webpage allows you to create a text file by writing and speaking.<br>
                When you are ready you can download the file to your system.<br>
                Click the speech image and start talking.<br>
                To add a special sign stop talking and wait for your last word to appear on the text area and then you can say the special sign:<br>
                For a new line say: ${languageDict['en-US']['new_line']}<br>
                For a dot say: ${languageDict['en-US']['dot']}<br>
                For a comma say: ${languageDict['en-US']['comma']}<br>
                For a question mark say: ${languageDict['en-US']['question_mark']}<br>
                `;
        
});

// Update explanation text and text area direction when the language is changed
selectLanguage.addEventListener('change', () => {
    newLanguage = selectLanguage.value;
    const direction = languageDict[newLanguage]['direction'] || 'ltr';
    
    console.log('New language:', newLanguage);
    explanation.innerHTML =`This webpage allows you to create a text file by writing and speaking.<br>
                When you are ready you can download the file to your system.<br>
                Click the speech image and start talking.<br>
                To add a special sign stop talking and wait for your last word to appear on the text area and then you can say the special sign:<br>
                For a new line say: ${languageDict[newLanguage]['new_line']}<br>
                For a dot say: ${languageDict[newLanguage]['dot']}<br>
                For a comma say: ${languageDict[newLanguage]['comma']}<br>
                For a question mark say: ${languageDict[newLanguage]['question_mark']}<br>
                `;
    textArea.style.direction = direction;
    
});
