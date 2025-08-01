document.addEventListener("DOMContentLoaded", function() {

    // Fungsi untuk memuat dan menyisipkan navbar
    const loadNavbar = () => {
        const navbarPlaceholder = document.getElementById("navbar-placeholder");
        if (navbarPlaceholder) {
            fetch('header.html') // Mengambil konten dari header.html
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    navbarPlaceholder.innerHTML = data; // Menyisipkan HTML navbar
                    setActiveNavLink(); // Menjalankan fungsi untuk menandai menu aktif
                    addNavbarScrollEffect(); // Menjalankan fungsi untuk efek scroll
                })
                .catch(error => {
                    console.error('Error loading the navbar:', error);
                    navbarPlaceholder.innerHTML = '<p style="color:red; text-align:center;">Gagal memuat navigasi.</p>';
                });
        }
    };

    // Fungsi untuk menandai link navbar yang aktif
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split("/").pop(); // Mendapatkan nama file halaman saat ini
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            // Jika halaman saat ini cocok dengan href link, tambahkan kelas 'active'
            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });
    };
    
    // Fungsi untuk efek scroll pada navbar (dari style.css)
    const addNavbarScrollEffect = () => {
        const navbar = document.querySelector(".navbar");
        if(navbar) {
            window.addEventListener("scroll", function() {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            });
        }
    };

    // Jalankan fungsi utama untuk memuat navbar
    loadNavbar();

    // -- Kode lain dari file Anda bisa ditambahkan di sini --
    // Misalnya, kode untuk widget visitor, slider, dll.
    // Pastikan kode tersebut juga berada di dalam event listener DOMContentLoaded
});