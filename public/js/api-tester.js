// API Tester functionality
const API_BASE = window.location.origin;

async function testEndpoint(button) {
    const container = button.closest('.endpoint-tester');
    const endpoint = container.dataset.endpoint;
    const method = container.dataset.method || 'POST';
    
    // Collect form data
    const inputs = container.querySelectorAll('.test-input');
    const data = {};
    inputs.forEach(input => {
        const field = input.dataset.field;
        let value = input.value;
        
        // Handle special types
        if (input.type === 'number' && value) {
            value = parseFloat(value);
        }
        
        data[field] = value;
    });
    
    // Show loading state
    button.disabled = true;
    button.textContent = '⏳ Sending...';
    
    // Get response container
    const responseContainer = container.querySelector('.tester-response');
    const responseBody = responseContainer.querySelector('.response-body code');
    
    try {
        // Build URL
        const url = `${API_BASE}${endpoint}`;
        
        // Make request
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        // Display response
        responseBody.textContent = JSON.stringify(result, null, 2);
        responseContainer.classList.add('show');
        
        // Auto-highlight
        if (window.Prism) {
            window.Prism.highlightElement(responseBody);
        }
        
    } catch (error) {
        responseBody.textContent = JSON.stringify({
            error: error.message,
            stack: error.stack
        }, null, 2);
        responseContainer.classList.add('show');
    } finally {
        button.disabled = false;
        button.textContent = '🚀 Test Endpoint';
    }
}

function clearResponse(button) {
    const container = button.closest('.tester-response');
    const responseBody = container.querySelector('.response-body code');
    responseBody.textContent = '';
    container.classList.remove('show');
}

// Auto-test on page load for demo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 API Tester loaded');
    console.log('📡 API Base URL:', API_BASE);
    
    // Add keyboard shortcut (Ctrl+Enter to test)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeElement = document.activeElement;
            const container = activeElement.closest('.endpoint-tester');
            if (container) {
                const button = container.querySelector('.btn-test');
                if (button && !button.disabled) {
                    testEndpoint(button);
                }
            }
        }
    });
});