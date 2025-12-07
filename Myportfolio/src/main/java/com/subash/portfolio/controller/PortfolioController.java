package com.subash.portfolio.controller;

import com.subash.portfolio.model.ContactForm;
import com.subash.portfolio.service.EmailService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class PortfolioController {
	@Autowired
	private EmailService emailService;


    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("name", "Subash M");
        model.addAttribute("title", "Java Full Stack Developer");
        model.addAttribute("location", "Chennai, India");
        return "index";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/skills")
    public String skills() {
        return "skills";
    }

    @GetMapping("/experience")
    public String experience() {
        return "experience";
    }

    @GetMapping("/projects")
    public String projects() {
        return "projects";
    }

    @GetMapping("/education")
    public String education() {
        return "education";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("contactForm", new ContactForm());
        return "contact";
    }
    @PostMapping("/contact")
    public String submitContact(@Valid @ModelAttribute ContactForm contactForm,
                                BindingResult result,
                                RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "contact";
        }

        // send the email
        emailService.sendContactMail(contactForm);

        redirectAttributes.addFlashAttribute("successMessage",
                "Thank you for your message! I'll get back to you soon.");
        return "redirect:/contact";
    }

}
