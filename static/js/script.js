document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const fileUploadInput = document.getElementById('fileUpload');
    const uploadButton = document.getElementById('uploadButton');
    const uploadStatus = document.getElementById('uploadStatus');
    
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const toggleChatButton = document.getElementById('toggleChatButton');
    const closeChatButton = document.getElementById('closeChatButton');
    const chatDocName = document.getElementById('chatDocName');

    let currentFileName = ''; // To store the name of the currently active document
    const faviconUrl = document.querySelector("link[rel*='icon']").href || '/static/img/favicon.ico'; // Get favicon URL

    // --- Helper Functions ---
    function updateUIForActiveDocument(filename) {
        currentFileName = filename;
        uploadStatus.textContent = `Active document: ${filename}. Open chat or upload a new file to replace.`;
        uploadStatus.className = 'status-message success';
        chatDocName.textContent = filename;
        toggleChatButton.style.display = 'flex';
    }

    function resetUIForNoDocument() {
        currentFileName = '';
        uploadStatus.textContent = '';
        uploadStatus.className = 'status-message';
        chatDocName.textContent = 'your document';
        chatMessages.innerHTML = '';
        toggleChatButton.style.display = 'none';
        chatContainer.style.display = 'none';
        fileUploadInput.value = '';
    }

    function addMessageToChat(sender, messageText, isThinking = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender.toLowerCase());
        
        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('message-avatar-container');

        const senderStrong = document.createElement('strong');
        
        if (sender.toLowerCase() === 'ai') {
            const aiAvatar = document.createElement('img');
            aiAvatar.src = faviconUrl;
            aiAvatar.alt = 'AI';
            aiAvatar.classList.add('chat-avatar', 'ai-avatar');
            avatarContainer.appendChild(aiAvatar);
            senderStrong.textContent = 'AI'; // Added AI emoji
        } else { // User
            const userAvatarPlaceholder = document.createElement('div'); // Or an actual user icon/emoji
            userAvatarPlaceholder.classList.add('chat-avatar', 'user-avatar');
            userAvatarPlaceholder.textContent = '👤'; // User emoji as placeholder avatar
            avatarContainer.appendChild(userAvatarPlaceholder);
            senderStrong.textContent = 'User'; // Added User emoji
        }
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        messageContent.appendChild(senderStrong);
        const textNode = document.createTextNode(messageText);
        messageContent.appendChild(textNode);

        messageElement.appendChild(avatarContainer);
        messageElement.appendChild(messageContent);


        if (isThinking) {
            messageElement.classList.add('thinking');
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageElement;
    }

    // --- Event Listeners ---
    uploadButton.addEventListener('click', async () => {
        const file = fileUploadInput.files[0];
        if (!file) {
            uploadStatus.textContent = 'Please select a file first.';
            uploadStatus.className = 'status-message error';
            return;
        }

        uploadStatus.textContent = 'Uploading and processing...';
        uploadStatus.className = 'status-message'; 
        const previousChatToggleState = toggleChatButton.style.display;
        if (currentFileName) {
            toggleChatButton.style.display = 'none';
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                updateUIForActiveDocument(result.filename);
                chatMessages.innerHTML = ''; 
                addMessageToChat('AI', `Hi! I'm ready to answer questions about ${currentFileName}.`);
            } else {
                uploadStatus.textContent = `Error: ${result.error || 'Upload failed'}`;
                uploadStatus.className = 'status-message error';
                if (currentFileName) {
                    uploadStatus.textContent = `Upload failed. Still active: ${currentFileName}. Error: ${result.error || 'Upload failed'}`;
                    toggleChatButton.style.display = previousChatToggleState; 
                } else { 
                    toggleChatButton.style.display = 'none';
                    chatContainer.style.display = 'none';
                }
            }
        } catch (error) {
            uploadStatus.textContent = 'Upload request failed. Check console.';
            uploadStatus.className = 'status-message error';
            console.error('Upload error:', error);
            if (currentFileName) {
                uploadStatus.textContent = `Upload failed. Still active: ${currentFileName}. See console for error.`;
                toggleChatButton.style.display = previousChatToggleState; 
            } else {
                 toggleChatButton.style.display = 'none';
                 chatContainer.style.display = 'none';
            }
        }
    });

    toggleChatButton.addEventListener('click', () => {
        if (!currentFileName) {
            alert("Please upload and process a document first.");
            return;
        }
        chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
        if (chatContainer.style.display === 'flex') {
            chatInput.focus();
        }
    });

    closeChatButton.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });

    async function sendMessage() {
        const question = chatInput.value.trim();
        if (!question) return;
        if (!currentFileName) {
            addMessageToChat('AI', "Please upload a document before asking questions.");
            return;
        }

        addMessageToChat('User', question);
        chatInput.value = '';
        const thinkingMessage = addMessageToChat('AI', 'Thinking...', true);

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: question }),
            });
            const result = await response.json();
            thinkingMessage.remove(); // Remove the "Thinking..." message
            // And replace it by adding the actual response.
            // Or, you could modify the content of thinkingMessage directly if you prefer.
            addMessageToChat('AI', result.answer || "Sorry, I didn't get a response.");

        } catch (error) {
            if (thinkingMessage) thinkingMessage.remove(); // Ensure thinking message is removed on error too
            addMessageToChat('AI', 'Error communicating with the server. Please try again.');
            console.error('Chat error:', error);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    });

    // --- Initialization on Page Load ---
    const initialDocNameHolder = document.getElementById('initialDocNameHolder');
    if (initialDocNameHolder && initialDocNameHolder.value) {
        updateUIForActiveDocument(initialDocNameHolder.value);
        // addMessageToChat('AI', `Continuing with ${initialDocNameHolder.value}. How can I help?`);
    } else {
        resetUIForNoDocument();
    }
});