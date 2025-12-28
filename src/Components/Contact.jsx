import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Wrench, 
  Send, 
  Clock, 
  MessageSquare,
  User,
  ChevronDown
} from "lucide-react";
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const ContactSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.95) 100%, rgba(15, 30, 20, 0.98) 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 75%, rgba(0, 230, 118, 0.15) 0%, transparent 15%),
      radial-gradient(circle at 70% 25%, rgba(0, 191, 165, 0.15) 0%, transparent 5%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.08) 0%, transparent 60%);
    animation: ${pulse} 4s ease-in-out infinite;
    pointer-events: none;
  }
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background: linear-gradient(to bottom, rgba(0, 30, 15, 1) 0%, rgba(10, 20, 15, 0) 60%);
  pointer-events: none;
  z-index: 1;
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfoCard = styled.div`
  background: linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 3rem;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  height: fit-content;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ContactFormCard = styled.div`
  background: linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 3rem;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #00E676, #00BFA5);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #b2dfdb;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const TitleDivider = styled.div`
  width: 80px;
  height: 3px;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  border-radius: 2px;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 230, 118, 0.05);
    border-color: rgba(0, 230, 118, 0.2);
    transform: translateX(8px);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.2), rgba(0, 191, 165, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00E676;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #00E676;
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

const ContactValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #e2e8f0;
  font-weight: 500;
`;

const InfoSection = styled.div`
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #b2dfdb;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
`;

const FormTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #b2dfdb;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(0, 230, 118, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300E676'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(0, 230, 118, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  option {
    background: #0a140f;
    color: white;
    padding: 0.5rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(0, 230, 118, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  border: none;
  border-radius: 50px;
  color: #0f0f0f;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 230, 118, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.3s ease;

  ${props => props.success ? `
    background: rgba(0, 230, 118, 0.1);
    color: #00E676;
    border: 1px solid rgba(0, 230, 118, 0.3);
  ` : `
    background: rgba(255, 0, 0, 0.1);
    color: #ff6b6b;
    border: 1px solid rgba(255, 0, 0, 0.3);
  `}
`;

const ErrorText = styled.span`
  color: #ff6b6b;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  const services = [
    "All in one (Brand Building)",
    "Graphics",
    "Video",
    "Websites",
    "Social Media Setup"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate phone number in real-time
    if (name === "phone") {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      if (value && !phoneRegex.test(value)) {
        setPhoneError("Please enter a valid phone number");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before submission
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    console.log("Form data", formData);
    setIsSubmitting(true);

    try {
      const res = await fetch("https://mainfile-osu3.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          services: formData.service,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setPhoneError("");
      } else {
        setSubmitStatus("error");
        console.error("Error:", data.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <ContactSection id='contact'>
      <TopOverlay />
      <ContactContainer>
        <ContentWrapper>
          {/* Left Side - Contact Info */}
          <ContactInfoCard>
            <SectionTitle>
              Get in <span style={{ WebkitTextFillColor: '#00BFA5' }}>Touch</span>
            </SectionTitle>
            <TitleDivider />
            <SectionSubtitle>
              Have a question, a project idea, or just want to say hello? Reach out
              to us anytime. We'd love to hear from you!
            </SectionSubtitle>

            <div>
              <ContactItem>
                <ContactIcon>
                  <Phone size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>
                    <a href='tel:+8801570209010' style={{ color: 'inherit', textDecoration: 'none' }}>
                      +880 157 0209 010
                    </a>
                  </ContactValue>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <Mail size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>contact@example.com</ContactValue>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <MapPin size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Location</ContactLabel>
                  <ContactValue>Dhaka, Bangladesh</ContactValue>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <Wrench size={20} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Specialization</ContactLabel>
                  <ContactValue>Brand Building</ContactValue>
                </ContactText>
              </ContactItem>
            </div>

            <InfoSection>
              <InfoItem>
                <Clock size={16} />
                <span>Response time: within 24 hours</span>
              </InfoItem>
              <InfoItem>
                <MessageSquare size={16} />
                <span>We love to talk about new ideas</span>
              </InfoItem>
            </InfoSection>
          </ContactInfoCard>

          {/* Right Side - Contact Form */}
          <ContactFormCard>
            <FormTitle>Send a Message</FormTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>
                  <User size={16} />
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Mail size={16} />
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Phone size={16} />
                  Phone Number (Optional)
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {phoneError && <ErrorText>{phoneError}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <Wrench size={16} />
                  Service Interested In
                </Label>
                <Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      border: '2px solid transparent',
                      borderTop: '2px solid currentColor',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </SubmitButton>

              {submitStatus && (
                <StatusMessage success={submitStatus === "success"}>
                  {submitStatus === "success" 
                    ? "✅ Message sent successfully! We'll get back to you soon." 
                    : "❌ Something went wrong. Please try again."}
                </StatusMessage>
              )}
            </form>
          </ContactFormCard>
        </ContentWrapper>
      </ContactContainer>
    </ContactSection>
  );
}