type ClickConfig = { interval: number; duration: number; maxClicks: number; };

function validateConfig(config: ClickConfig): boolean {  
    if (config.interval < 100 || config.duration < 100 || config.maxClicks <= 0) {  
        console.error('Invalid configuration parameters.');  
        return false;  
    }  
    return true;  
}

function autoclick(config: ClickConfig): void {  
    if (!validateConfig(config)) return;  
    let { interval, duration, maxClicks } = config;  
    let clicks = 0;  
    const startTime = Date.now();  

    const clickInterval = setInterval(() => {  
        if (clicks < maxClicks && (Date.now() - startTime) < duration) {  
            console.log('Click!');  
            clicks++;  
        } else {  
            clearInterval(clickInterval);  
        }  
    }, interval);  
}

// Usage example  
const config: ClickConfig = { interval: 500, duration: 5000, maxClicks: 10 };  
autoclick(config);