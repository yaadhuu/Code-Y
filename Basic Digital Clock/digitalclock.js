function updateclock() {
    const now = new Date();
    let hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const secs = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;  

    const timestring = `${hours}:${mins}:${secs} ${ampm}`;
    document.getElementById("clock").textContent = timestring;
}

updateclock();
setInterval(updateclock, 1000);
