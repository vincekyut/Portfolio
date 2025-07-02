// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-bar")
      skillBars.forEach((bar) => {
        const level = bar.getAttribute("data-level")
        bar.style.width = level + "%"
      })
    }
  })
}, observerOptions)

// Observe skills section
const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  observer.observe(skillsSection)
}

// Fade in animation for sections
const fadeElements = document.querySelectorAll(".about, .projects, .education, .contact")

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in", "visible")
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

fadeElements.forEach((element) => {
  element.classList.add("fade-in")
  fadeObserver.observe(element)
})

// Contact form handling
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert(`Thank you ${name}! Your message about "${subject}" has been sent. I'll get back to you soon.`)
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Typing animation for hero section - Fixed version
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  // Check if text contains HTML tags
  if (text.includes("<span")) {
    // For HTML content, we'll type the visible text but maintain HTML structure
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = text
    const visibleText = tempDiv.textContent || tempDiv.innerText

    function type() {
      if (i < visibleText.length) {
        const currentChar = visibleText.charAt(i)

        // Build the HTML structure progressively
        if (i < 8) {
          // "Hi, I'm "
          element.innerHTML = visibleText.substring(0, i + 1)
        } else {
          // Start highlighting the name
          const beforeName = "Hi, I'm "
          const nameProgress = visibleText.substring(8, i + 1)
          element.innerHTML = beforeName + '<span class="highlight">' + nameProgress + "</span>"
        }

        i++
        setTimeout(type, speed)
      }
    }

    type()
  } else {
    // Original function for plain text
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }
    type()
  }
}

// Initialize typing animation when page loads - Updated
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    // Set the final HTML structure but start with empty content
    const finalHTML = 'Hi, I\'m <span class="highlight">Vincent Agbuya</span>'
    setTimeout(() => {
      typeWriter(heroTitle, finalHTML, 80)
    }, 500)
  }
})

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Skill level counter animation
function animateSkillNumbers() {
  const skillBars = document.querySelectorAll(".skill-bar")

  skillBars.forEach((bar) => {
    const level = Number.parseInt(bar.getAttribute("data-level"))
    const skillItem = bar.closest(".skill-item")
    const skillName = skillItem.querySelector("span").textContent

    // Add percentage display
    if (!skillItem.querySelector(".skill-percentage")) {
      const percentage = document.createElement("span")
      percentage.className = "skill-percentage"
      percentage.style.marginLeft = "10px"
      percentage.style.color = "#666"
      percentage.style.fontSize = "0.9rem"
      skillItem.appendChild(percentage)

      // Animate the number
      let current = 0
      const increment = level / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= level) {
          current = level
          clearInterval(timer)
        }
        percentage.textContent = Math.round(current) + "%"
      }, 30)
    }
  })
}

// Trigger skill animation when skills section is visible
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateSkillNumbers, 500)
        skillsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Console message for developers
console.log(`
🎓 BSIT Student Portfolio
📧 Contact: your.email@example.com
💻 GitHub: github.com/yourusername
🚀 Languages: C++, Java, PHP, HTML/CSS/JS

Current Projects:
• Pharmacy Sales & Inventory (PHP)
• Hotel Management System (Figma)
• Jollibee Ordering System (C++)

Thanks for checking out my portfolio! 
Still learning and growing as a developer 📚
`)

// Add some Easter eggs for fun
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    alert(
      "🎉 Konami Code activated! You found the Easter egg! 🎮\n\nAs a BSIT student, I appreciate attention to detail! 😄",
    )
    konamiCode = []
  }
})
