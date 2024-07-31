let count = 0;
let flag = false;
const recognition =  new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;


function normalizePartialTranscript(partialTranscript, lastChar) {
    // Check if the partial transcript has any content
    if (partialTranscript.length > 0) {
        // Get the first character of the partial transcript
        const firstChar = partialTranscript.charAt(0);
        
        // Check if the last character is a dot, new line, or the textarea is empty
        if (lastChar === '' || lastChar === '.' || lastChar === '\n' || lastChar ==='?') {
            // Convert the first character to uppercase
            return firstChar.toLocaleUpperCase() + partialTranscript.slice(1);
        } else {
            // Convert the first character to lowercase
            return firstChar.toLocaleLowerCase() + partialTranscript.slice(1);
        }
    }
    // Return the partial transcript as is if it has no content
    return partialTranscript;
}


function startRecognition() {
    // Check if microphone access is granted
    if (!micAccess) {
        alert('🚫 Microphone access is not granted.\nPlease allow microphone access to use this feature. 🎤🎤');
        return;
    }
    
    // Set the recognition language to the selected language
    recognition.lang = selectLanguage.value;

    // Toggle recognition state and update the speech image accordingly
    const speechImage = document.getElementById('speech-image');
    if (isRecognizing) {
        recognition.stop();
        speechImage.src = './assets/images/speech-image-1.png';
    } else {
        recognition.start();
        speechImage.src = './assets/images/speech-image-2.png';
    }
    isRecognizing = !isRecognizing;

    // Log when audio capturing starts
    recognition.onaudiostart = () => {
        console.log("Audio capturing started");
    };
    
    // Handle the recognition result
    recognition.onresult = (event) => {
        try {
        let partialTranscript = event.results[count][0].transcript.trim();
        const lastChar = textArea.value.slice(-1);
        // Normalize the partial transcript based on the last character in the text area
        partialTranscript = normalizePartialTranscript(partialTranscript, lastChar);
        if (partialTranscript.toLocaleLowerCase() == languageDict[selectLanguage.value]["dot"]){
            console.log("Dot requested.")
            textArea.value = textArea.value.trim() +  " ."
        } else if (partialTranscript.toLocaleLowerCase() == languageDict[selectLanguage.value]["comma"]) {
            textArea.value = textArea.value.trim() + " ,"
        } else if(partialTranscript.toLocaleLowerCase() == languageDict[selectLanguage.value]["new_line"]){
            textArea.value += "\n"
        }else if (partialTranscript.toLocaleLowerCase() == languageDict[selectLanguage.value]["question_mark"]) {
            textArea.value = textArea.value.trim() + " ?"
        } else {
            textArea.value += partialTranscript + " "
        }
        count +=1;
        }catch (error) {
            console.log(error);
            
        }       
    };
    // Log when recognition ends and restart if necessary
    recognition.onend = () => {
        console.log("recognition ended");
        count=0;
        if (isRecognizing) {
            // Restart recognition if it was stopped unintentionally
            recognition.start(); 
        }
       
    };

    
}