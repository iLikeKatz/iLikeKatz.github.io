document.getElementById('teamForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const memberName = document.getElementById('memberName').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;
    const shares = document.getElementById('shares').value;
    const editIndex = document.getElementById('editIndex').value;

    let teamData = JSON.parse(localStorage.getItem('teamData')) || [];

    const teamMember = { name: memberName, position: position, salary: salary, shares: shares };

    if (editIndex === "") {
        // ถ้าไม่มี index แสดงว่าเป็นการเพิ่มสมาชิกใหม่
        teamData.push(teamMember);
    } else {
        // ถ้ามี index แสดงว่าเป็นการแก้ไขข้อมูล
        teamData[editIndex] = teamMember;
    }

    localStorage.setItem('teamData', JSON.stringify(teamData));

    // รีเซ็ตฟอร์ม
    document.getElementById('teamForm').reset();
    document.getElementById('editIndex').value = "";

    displaySavedTeamData();
});

function displaySavedTeamData() {
    const savedTeamData = JSON.parse(localStorage.getItem('teamData')) || [];
    const teamContainer = document.getElementById('savedTeamData');

    teamContainer.innerHTML = savedTeamData.map((member, index) => `
        <p><strong>Name:</strong> ${member.name} | 
        <strong>Position:</strong> ${member.position} | 
        <strong>Salary:</strong> ${member.salary} | 
        <strong>Shares:</strong> ${member.shares} 
        <button onclick="editTeamMember(${index})">Edit</button>
        <button onclick="deleteTeamMember(${index})">Delete</button></p>
    `).join('');
}

function editTeamMember(index) {
    const savedTeamData = JSON.parse(localStorage.getItem('teamData'));
    const member = savedTeamData[index];

    document.getElementById('memberName').value = member.name;
    document.getElementById('position').value = member.position;
    document.getElementById('salary').value = member.salary;
    document.getElementById('shares').value = member.shares;
    document.getElementById('editIndex').value = index;
}

function deleteTeamMember(index) {
    let savedTeamData = JSON.parse(localStorage.getItem('teamData'));
    savedTeamData.splice(index, 1);
    localStorage.setItem('teamData', JSON.stringify(savedTeamData));
    displaySavedTeamData();
}

// โหลดข้อมูลเมื่อหน้าเว็บเปิดขึ้นมา
window.onload = displaySavedTeamData;
