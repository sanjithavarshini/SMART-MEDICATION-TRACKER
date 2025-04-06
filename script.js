document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("medForm");
    const medList = document.getElementById("medList");

    let medications = JSON.parse(localStorage.getItem("medications")) || [];

    function displayMeds() {
        medList.innerHTML = "";
        medications.forEach((med, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${med.name} at ${med.time} 
            <button onclick="deleteMed(${index})">X</button>`;
            medList.appendChild(li);
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const medName = document.getElementById("medName").value;
        const medTime = document.getElementById("medTime").value;

        const newMed = { name: medName, time: medTime };
        medications.push(newMed);
        localStorage.setItem("medications", JSON.stringify(medications));

        scheduleReminder(newMed);
        displayMeds();
        form.reset();
    });

    window.deleteMed = function (index) {
        medications.splice(index, 1);
        localStorage.setItem("medications", JSON.stringify(medications));
        displayMeds();
    };

    function scheduleReminder(med) {
        const now = new Date();
        const medTime = new Date();
        const [hours, minutes] = med.time.split(":");
        medTime.setHours(hours, minutes, 0);

        const timeDiff = medTime - now;
        if (timeDiff > 0) {
            setTimeout(() => {
                alert(`Time to take your medicine: ${med.name}`);
            }, timeDiff);
        }
    }

    medications.forEach(scheduleReminder);
    displayMeds();
});
