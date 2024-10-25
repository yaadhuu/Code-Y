
async function generateAIpassword() {
    const passlength = 12; 

    
    const response = await fetch('https://www.random.org/strings/?num=1&len=12&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new');
    
   
    if (response.ok) {
        const password = await response.text(); 
        document.getElementById('password').value = password.trim(); 
    } else {
        alert('Error generating password');
    }
}


async function analyzePassword() {
    const password = document.getElementById('password').value;

    if (!password) {
        alert("Please generate or enter a password first!");
        return;
    }

    
    const hashedPassword = await sha1(password);

    
    const prefix = hashedPassword.substring(0, 5);
    const suffix = hashedPassword.substring(5);

   
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    
    if (response.ok) {
        const data = await response.text();
        
        const found = data.split('\n').some(entry => entry.startsWith(suffix.toUpperCase()));

        
        if (found) {
            document.getElementById('strength-analysis').innerText = "Your password has been found in previous data breaches. Consider changing it.";
        } else {
            document.getElementById('strength-analysis').innerText = "Your password is safe.";
        }
    } else {
        alert('Error checking password');
    }
}


async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
