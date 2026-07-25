let aCourse = {
    code: "WDD131",
    title: "Dynamic Web Fundamentals",
    credits: 2,
    sections: [
        {
            sectionNumber: "001",
            enrolled: 25,
            instructor: "Matthew Kearl"
        },
        {
            sectionNumber: "002",
            enrolled: 30,
            instructor: "Sarah Smith"
        }
    ]
};

function setCourseInformation(course) {
    document.querySelector("#courseName").innerHTML = `${course.code} - ${course.title}`;
}

function renderSections(course) {
    const tbody = document.querySelector("#sections tbody");
    let rows = "";
    for (const section of course.sections) {
        rows += `<tr>
                    <td>${section.sectionNumber}</td>
                    <td>${section.enrolled}</td>
                    <td>${section.instructor}</td>
                 </tr>`;
    }
    tbody.innerHTML = rows;
}

setCourseInformation(aCourse);
renderSections(aCourse);