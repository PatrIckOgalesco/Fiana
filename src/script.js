document.addEventListener('DOMContentLoaded', function() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Add click handlers to all navigation links
    const navLinks = document.querySelectorAll('.menu-links a, .nav-link a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Show loading overlay
            loadingOverlay.style.display = 'flex';
            
            // Simulate loading time (you can remove this setTimeout in production)
            setTimeout(() => {
                window.location.href = href;
            }, 1500); // Loading Duration
        });
    });

    // Hide loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        loadingOverlay.style.display = 'none';
    });

    // Show loading overlay on page unload
    window.addEventListener('beforeunload', function() {
        loadingOverlay.style.display = 'flex';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navBtn = document.getElementById("nav-btn");
    const sidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".container");
    const isMainPage = document.querySelector(".chat-container") !== null;

    // Function to toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle("open");
        if (isMainPage && window.innerWidth < 800) {
            container.classList.toggle("container-pushed");
        }
    }

    // Event listener for the navigation button
    if (navBtn) {
        navBtn.addEventListener("click", function () {
            toggleSidebar();
            // Toggle the menu icon
            if (navBtn.classList.contains('bx-menu')) {
                navBtn.classList.remove('bx-menu');
                navBtn.classList.add('bx-menu-alt-left');
            } else {
                navBtn.classList.remove('bx-menu-alt-left');
                navBtn.classList.add('bx-menu');
            }
        });
    }

    // Function to handle window resize
    function handleWindowResize() {
        if (window.innerWidth >= 800) {
            sidebar.classList.add("open");
            container.classList.add("container-pushed");
        } else {
            sidebar.classList.remove("open");
            container.classList.remove("container-pushed");
        }
    }

    // Initially handle the window size
    handleWindowResize();

    // Event listener for window resize
    window.addEventListener("resize", handleWindowResize);
});

document.addEventListener('DOMContentLoaded', function() {
    async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const phrases = ["Smart", "Helpful", "Responsive", "Virtual Assistant!", "Intelligent"];
    const el = document.getElementById("typewriter");

    if (!el) {
        console.error("Typewriter element not found!");
        return;
    }

    const sleepTime = 100;

    const typePhrase = async (phrase) => {
        for (let i = 0; i < phrase.length; i++) {
            el.textContent = phrase.substring(0, i + 1);
            await sleep(sleepTime);
        }
        await sleep(sleepTime * 10); // Pause at the end of phrase
    };

    const erasePhrase = async (phrase) => {
        for (let i = phrase.length; i >= 0; i--) {
            el.textContent = phrase.substring(0, i);
            await sleep(sleepTime);
        }
        await sleep(sleepTime * 5); // Pause after erasing
    };

    const writeLoop = async () => {
        try {
            while (true) {
                for (const phrase of phrases) {
                    await typePhrase(phrase);
                    await erasePhrase(phrase);
                }
            }
        } catch (error) {
            console.error("Error in typing animation:", error);
        }
    };

    // Start the animation
    writeLoop();
});

// Add some CSS to ensure the typewriter element is visible
document.head.insertAdjacentHTML('beforeend', `
    <style>
        #typewriter {
            display: inline-block;
            min-height: 1.2em;
            color: #75a99c;
            font-weight: bold;
        }
        #cursor {
            display: inline-block;
            animation: blink 1s infinite;
            color: #75a99c;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    </style>
`);

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to your server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// After generating and appending the response
function scrollToBottom() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Call this function after adding new messages
// For example, after your response generation:
generateResponse().then(() => {
    scrollToBottom();
});

// Update the typeText function to handle code blocks with Prism
const typeText = async (element, text, speed = 15) => {
    let index = 0;
    element.innerHTML = '';
    
    const processMarkdown = async () => {
        while (index < text.length) {
            // Handle code blocks
            if (text.substring(index).startsWith('```')) {
                const endIndex = text.indexOf('```', index + 3);
                if (endIndex !== -1) {
                    const codeBlock = text.substring(index + 3, endIndex);
                    const language = codeBlock.split('\n')[0].trim();
                    const code = codeBlock.split('\n').slice(1).join('\n');
                    
                    const pre = document.createElement('pre');
                    pre.setAttribute('data-language', language);
                    pre.className = `language-${language}`;
                    
                    const codeElement = document.createElement('code');
                    codeElement.className = `language-${language}`;
                    codeElement.textContent = code;
                    
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-button';
                    copyButton.textContent = 'Copy';
                    copyButton.onclick = () => {
                        navigator.clipboard.writeText(code);
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => copyButton.textContent = 'Copy', 2000);
                    };
                    
                    pre.appendChild(copyButton);
                    pre.appendChild(codeElement);
                    element.appendChild(pre);
                    
                    Prism.highlightElement(codeElement);
                    index = endIndex + 3;
                    await new Promise(resolve => setTimeout(resolve, speed * 10));
                }
            } else {
                element.innerHTML += text.charAt(index);
                index++;
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
    };

    await processMarkdown();
    return Promise.resolve();
};

// Add this at the end of your script
// Load Prism and its components
document.addEventListener('DOMContentLoaded', () => {
    // Load SimpleBar
    const simplebarScript = document.createElement('script');
    simplebarScript.src = 'https://unpkg.com/simplebar/dist/simplebar.min.js';
    document.head.appendChild(simplebarScript);

    // Load Prism core and components
    Promise.all([
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-core.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-javascript.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-python.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-css.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-markup.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-c.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-java.min.js'),
        import('https://cdn.jsdelivr.net/npm/prismjs@1.25.0/plugins/toolbar/prism-toolbar.min.js')
    ]).then(() => {
        // Initialize Prism
        Prism.highlightAll();

    });
});

const handleOutgoingChat = async () => {
    try {
        const loadingDiv = createLoadingElement();
        chatContainer.appendChild(loadingDiv);
        
        const response = await generateResponse();
        loadingDiv.remove();
        
        const chatDiv = createChatElement(response, 'incoming');
        chatContainer.appendChild(chatDiv);
        
        await typeText(chatDiv.querySelector('.typing-text'), response.text);
        
    } catch (error) {
        console.error('Chat error:', error);
        showErrorMessage('Failed to generate response. Please try again.');
    }
};

const createLoadingElement = () => {
    const loadingHtml = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="src/images/chatlogo.jpg" alt="chatbot-img">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    return createChatElement(loadingHtml, 'incoming');
};

const showErrorMessage = (message) => {
    const errorHtml = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="src/images/chatlogo.jpg" alt="chatbot-img">
                <div class="error-message">
                    ${message}
                    <button onclick="handleRetry(this)" class="retry-btn">Retry</button>
                </div>
            </div>
        </div>
    `;
    const errorDiv = createChatElement(errorHtml, 'incoming');
    chatContainer.appendChild(errorDiv);
};