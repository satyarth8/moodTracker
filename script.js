
    //select the input element and output element
    const moodForm = document.getElementById('moodForm');
    const timeline = document.getElementById('timeline');

    // load existing mood logs 
    function loadMoodLogs() {
        return JSON.parse(localStorage.getItem('moodLogs')) || [];
    }

    // save mood logs
    function saveMoodLogs(moodLogs) {
        localStorage.setItem('moodLogs', JSON.stringify(moodLogs));
    }

    // display the moods in timeline
    function displayTimeline(moodLogs) {
        timeline.innerHTML = ''; // clear the output and then we loop and display
        moodLogs.forEach(log => {
            const entry = document.createElement('div');
            entry.className = 'mood-entry';
            entry.textContent = `${log.date}: ${log.mood}`;
            timeline.appendChild(entry);
        });
    }

    // event listner for the value save button clicked
    moodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mood = document.getElementById('mood').value;
        const date = new Date().toISOString().split('T')[0];
        const moodLogs = loadMoodLogs();// get logs from storage
         // save the log if it doesnt exist
        const existingLog = moodLogs.find(log => log.date === date);
        if (!existingLog) {
            moodLogs.push({ date, mood });
        } else {
            existingLog.mood = mood; // update existing entry
        }
        saveMoodLogs(moodLogs);
        displayTimeline(moodLogs);
        moodForm.reset();
    });

    // Initial load of mood logs
    const initialMoodLogs = loadMoodLogs();
    displayTimeline(initialMoodLogs);
