package com.subash.portfolio.service;

import com.subash.portfolio.model.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactMail(ContactForm form) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("subashmadhavan05@gmail.com");
        msg.setSubject("Contact from Portfolio: " + form.getSubject());
        msg.setText("Name: " + form.getName() + "\n" +
                    "Email: " + form.getEmail() + "\n\n" +
                    "Message:\n" + form.getMessage());
        mailSender.send(msg);
    }
}
