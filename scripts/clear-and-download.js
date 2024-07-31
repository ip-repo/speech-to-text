function downloadText() {
    // Check if the text area has any content
    if (textArea.value){
        // Create a new Blob object with the text area's content
        const blob = new Blob([textArea.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        // Generate a timestamp string for the file name
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        a.download = `output_${timestamp}.txt`;
        // Trigger the download by clicking the anchor element
        a.click();
        // Revoke the object URL to free up memory
        URL.revokeObjectURL(url);
    }
}

function clearTextArea() {
    // Clear the content of the text area
    textArea.value = '';
}
