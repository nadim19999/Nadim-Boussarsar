// Fonctionnalité pour la barre de navigation collante
var navbar = document.querySelector(".navbar");
window.onscroll = () => {
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

// Toggle pour le menu de navigation mobile
const navMenu = document.querySelector(".menu");
navToggle = document.querySelector(".menu-btn");
if (navToggle) {
    navToggle.addEventListener("click", () => { navMenu.classList.toggle("active"); })
}

// Fermer le menu de navigation mobile lors du clic sur un lien
const navLink = document.querySelectorAll(".nav-link");
function linkAction() {
    const navMenu = document.querySelector(".menu");
    navMenu.classList.remove("active")
}
navLink.forEach(n => n.addEventListener("click", linkAction))

// Mettre en surbrillance de la section active dans le menu de navigation lors du défilement
const Section = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.pageYOffset
    Section.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.links a[href*=' + sectionId + ']').classList.add('active')
        }
        else {
            document.querySelector('.links a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// Animer les barres de compétences lors du défilement
const skills_wrap = document.querySelector(".about-skills"),
    skills_bar = document.querySelectorAll(".progress-line");
window.addEventListener("scroll", () => {
    skillsEffect();
})

// Vérifier si la section des compétences est visible à l'écran
function checkScroll(el) {
    let rect = el.getBoundingClientRect();
    if (window.innerHeight >= rect.top + el.offsetHeight) return true;
    return false;
}

// Animer les barres de compétences en fonction de l'attribut data-progress
function skillsEffect() {
    if (!checkScroll(skills_wrap)) return;
    skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

// Calculer et afficher le score du quiz
function calculateScore() {
    var allAnswered = true;
    for (var i = 1; i <= 10; i++) {
        var answer = document.querySelector('input[name="q' + i + '"]:checked');
        if (!answer) {
            allAnswered = false;
            break;
        }
    }
    if (!allAnswered) {
        alert("Veuillez répondre à toutes les questions avant de soumettre.");
        return;
    }
    var q1Answer = document.querySelector('input[name="q1"]:checked').value;
    var q2Answer = document.querySelector('input[name="q2"]:checked').value;
    var q3Answer = document.querySelector('input[name="q3"]:checked').value;
    var q4Answer = document.querySelector('input[name="q4"]:checked').value;
    var q5Answer = document.querySelector('input[name="q5"]:checked').value;
    var q6Answer = document.querySelector('input[name="q6"]:checked').value;
    var q7Answer = document.querySelector('input[name="q7"]:checked').value;
    var q8Answer = document.querySelector('input[name="q8"]:checked').value;
    var q9Answer = document.querySelector('input[name="q9"]:checked').value;
    var q10Answer = document.querySelector('input[name="q10"]:checked').value;

    // Calculer le score et afficher les résultats
    var score = 0;
    if (q1Answer === "JavaScript") score++;
    if (q2Answer === "Hypertext Markup Language") score++;
    if (q3Answer === "Manage system resources") score++;
    if (q4Answer === "Style the appearance of web pages") score++;
    if (q5Answer === "Stack") score++;
    if (q6Answer === "Clone a repository") score++;
    if (q7Answer === "Application Programming Interface") score++;
    if (q8Answer === "Query and manipulate databases") score++;
    if (q9Answer === "Hypertext Transfer Protocol and Hypertext Transfer Protocol Secure") score++;
    if (q10Answer === "Translate source code into machine code") score++;
    var correctAnswersList = "Correct Answers:\n1. JavaScript\n2. Hypertext Markup Language\n3. Manage system resources\n4. Style the appearance of web pages\n5. Stack\n6. Clone a repository\n7. Application Programming Interface\n8. Query and manipulate databases\n9. Hypertext Transfer Protocol and Hypertext Transfer Protocol Secure\n10. Translate source code into machine code\n";
    alert("Your score is " + score + " out of 10.\n\n" + correctAnswersList);
}

// Gérer la soumission du formulaire
function submitForm() {
    event.preventDefault();
    var form = document.getElementById("myForm");
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://formspree.io/f/xeqyolyr", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var responseWindow = window.open("", "_blank");
                responseWindow.document.write(xhr.responseText);
            } else {
                Swal.fire({
                    title: "Message sent successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
            }
        }
    };
    xhr.send(formData);
}
