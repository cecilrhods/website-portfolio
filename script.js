// =======================
// THEME TOGGLE
// =======================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

// =======================
// PROFILE UPLOAD
// =======================
const uploadInput = document.getElementById('upload');
const profileImage = document.getElementById('profileImage');
uploadInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if(file) profileImage.src = URL.createObjectURL(file);
});

// =======================
// POPUP MESSAGES
// =======================
function showPopup(message,type="success"){
    const popup = document.getElementById('popupMessage');
    popup.textContent=message;
    popup.className=`popup-message show ${type}`;
    setTimeout(()=>popup.classList.remove('show'),3000);
}

// =======================
// EMAILJS CONTACT FORM
// =======================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.classList.add('loading'); sendBtn.textContent='Sending...';
    emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',this,'YOUR_PUBLIC_KEY')
    .then(()=>{
        sendBtn.classList.remove('loading'); sendBtn.textContent='Send Message';
        showPopup('Message sent successfully!','success'); contactForm.reset();
    }).catch(error=>{
        sendBtn.classList.remove('loading'); sendBtn.textContent='Send Message';
        showPopup('Oops! Something went wrong.','error'); console.error(error);
    });
});

// =======================
// ANIMATE CONTACT ON SCROLL
// =======================
const contactSection = document.getElementById('contact');
function revealContact(){
    const top = contactSection.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){ contactSection.classList.add('visible'); window.removeEventListener('scroll',revealContact);}
}
window.addEventListener('scroll',revealContact); revealContact();

// =======================
// SMOOTH SCROLL NAV
// =======================
document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', e=>{
        e.preventDefault();
        const target=document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({behavior:'smooth'});
    });
});

// =======================
// PROJECTS MODAL
// =======================
const projectForm = document.getElementById('projectForm');
const projectContainer = document.getElementById('projectContainer');
const projectPreview = document.getElementById('projectPreview');

document.getElementById('projectImage').addEventListener('input', e=>{
    projectPreview.src = e.target.value || "https://via.placeholder.com/300x200";
});

projectForm.addEventListener('submit', e=>{
    e.preventDefault();

    const title = document.getElementById('projectTitle').value;
    const desc = document.getElementById('projectDesc').value;
    const image = document.getElementById('projectImage').value || "https://via.placeholder.com/300x200";
    const link = document.getElementById('projectLink').value;
    const github = document.getElementById('githubLink').value;

    const col = document.createElement('div'); col.className="col-md-4";
    const card = document.createElement('div'); card.className="card h-100";

    const imgEl = document.createElement('img'); imgEl.src=image; imgEl.className="card-img-top"; imgEl.alt=title;

    const cardBody = document.createElement('div'); cardBody.className="card-body";
    const titleEl = document.createElement('h5'); titleEl.className="card-title"; titleEl.textContent=title;
    const descEl = document.createElement('p'); descEl.className="card-text"; descEl.textContent=desc;

    cardBody.appendChild(titleEl); cardBody.appendChild(descEl);

    if(link){
        const aLink = document.createElement('a'); aLink.href=link; aLink.target="_blank"; aLink.className="btn btn-outline-primary mt-2"; aLink.textContent="View Project";
        cardBody.appendChild(aLink);
    }

    if(github){
        const ghLink=document.createElement('a'); ghLink.href=github; ghLink.target="_blank"; ghLink.className="btn btn-dark mt-2 ms-2"; ghLink.innerHTML='<i class="fab fa-github"></i> GitHub';
        cardBody.appendChild(ghLink);
    }

    card.appendChild(imgEl); card.appendChild(cardBody); col.appendChild(card); projectContainer.appendChild(col);

    projectForm.reset();
    projectPreview.src="https://via.placeholder.com/300x200";
    const modalEl = document.getElementById('projectModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
    showPopup('Project added successfully!', 'success');
});
