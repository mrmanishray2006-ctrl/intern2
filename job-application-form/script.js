/**
 * Job Application Form Validation and UI Interactions
 * Suitable for a web development internship portfolio.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // DOM ELEMENTS
  // ==========================================================================
  const form = document.getElementById('jobAppForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const cityInput = document.getElementById('city');
  const positionSelect = document.getElementById('position');
  const experienceRadios = document.getElementsByName('experience');
  const skillCheckboxes = document.getElementsByName('skills');
  const portfolioInput = document.getElementById('portfolio');
  const messageTextarea = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const termsCheckbox = document.getElementById('terms');
  
  // Modal elements
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // ==========================================================================
  // HELPER FUNCTIONS FOR VISUAL STATES
  // ==========================================================================
  
  /**
   * Set a field as valid (adds green border, shows check icon)
   */
  const setValid = (element, groupElement) => {
    const parent = groupElement || element.closest('.form-group');
    if (parent) {
      parent.classList.remove('is-invalid');
      parent.classList.add('is-valid');
    }
  };

  /**
   * Set a field as invalid (adds red border, shows error icon, displays helper text)
   */
  const setInvalid = (element, groupElement) => {
    const parent = groupElement || element.closest('.form-group');
    if (parent) {
      parent.classList.remove('is-valid');
      parent.classList.add('is-invalid');
    }
  };

  /**
   * Clear all validation states from a field
   */
  const clearValidationState = (element, groupElement) => {
    const parent = groupElement || element.closest('.form-group');
    if (parent) {
      parent.classList.remove('is-valid');
      parent.classList.remove('is-invalid');
      parent.classList.remove('shake');
    }
  };

  /**
   * Trigger shake animation on invalid field group
   */
  const triggerShake = (groupElement) => {
    groupElement.classList.remove('shake');
    // Force browser reflow to restart CSS keyframe animation
    void groupElement.offsetWidth;
    groupElement.classList.add('shake');
    
    // Remove shake class after animation completes so it can be re-triggered
    setTimeout(() => {
      groupElement.classList.remove('shake');
    }, 450);
  };

  // ==========================================================================
  // FIELD SPECIFIC VALIDATION LOGIC
  // ==========================================================================

  /**
   * 1. Full Name Validation
   * - Cannot be empty
   * - Minimum 3 characters
   * - Letters and spaces only
   */
  const validateFullName = () => {
    const value = fullNameInput.value.trim();
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    
    if (value === '' || !namePattern.test(value)) {
      setInvalid(fullNameInput);
      return false;
    }
    setValid(fullNameInput);
    return true;
  };

  /**
   * 2. Email Validation
   * - Cannot be empty
   * - Proper email format syntax
   */
  const validateEmail = () => {
    const value = emailInput.value.trim();
    // Comprehensive RFC-compliant regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (value === '' || !emailPattern.test(value)) {
      setInvalid(emailInput);
      return false;
    }
    setValid(emailInput);
    return true;
  };

  /**
   * 3. Phone Number Validation
   * - Cannot be empty
   * - Exactly 10 digits
   * - Numbers only
   */
  const validatePhone = () => {
    const value = phoneInput.value.trim();
    const phonePattern = /^\d{10}$/;
    
    if (value === '' || !phonePattern.test(value)) {
      setInvalid(phoneInput);
      return false;
    }
    setValid(phoneInput);
    return true;
  };

  /**
   * 4. City Validation
   * - Cannot be empty
   */
  const validateCity = () => {
    const value = cityInput.value.trim();
    if (value === '') {
      setInvalid(cityInput);
      return false;
    }
    setValid(cityInput);
    return true;
  };

  /**
   * 5. Position Dropdown Validation
   * - A position must be selected (value cannot be empty)
   */
  const validatePosition = () => {
    const value = positionSelect.value;
    if (value === '') {
      setInvalid(positionSelect);
      return false;
    }
    setValid(positionSelect);
    return true;
  };

  /**
   * 6. Experience Level Validation (Radios)
   * - One of the options must be checked
   */
  const validateExperience = () => {
    const groupElement = document.getElementById('group-experience');
    let isChecked = false;
    
    for (const radio of experienceRadios) {
      if (radio.checked) {
        isChecked = true;
        break;
      }
    }
    
    if (!isChecked) {
      setInvalid(null, groupElement);
      return false;
    }
    setValid(null, groupElement);
    return true;
  };

  /**
   * 7. Skills Validation (Checkboxes)
   * - At least one checkbox must be checked
   */
  const validateSkills = () => {
    const groupElement = document.getElementById('group-skills');
    let isChecked = false;
    
    for (const cb of skillCheckboxes) {
      if (cb.checked) {
        isChecked = true;
        break;
      }
    }
    
    if (!isChecked) {
      setInvalid(null, groupElement);
      return false;
    }
    setValid(null, groupElement);
    return true;
  };

  /**
   * 8. Portfolio Website Validation (Optional)
   * - Optional (valid if empty)
   * - If entered, must match a valid URL format
   */
  const validatePortfolio = () => {
    const value = portfolioInput.value.trim();
    if (value === '') {
      clearValidationState(portfolioInput);
      return true; // Valid since it is optional
    }
    
    // Regular expression for validating standard website URLs
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
    
    if (!urlPattern.test(value)) {
      setInvalid(portfolioInput);
      return false;
    }
    setValid(portfolioInput);
    return true;
  };

  /**
   * 9. Message Textarea Validation
   * - Minimum 20 characters
   * - Maximum 300 characters
   */
  const validateMessage = () => {
    const value = messageTextarea.value;
    const length = value.length;
    
    if (length < 20 || length > 300) {
      setInvalid(messageTextarea);
      return false;
    }
    setValid(messageTextarea);
    return true;
  };

  /**
   * 10. Terms and Conditions Validation
   * - Must be checked
   */
  const validateTerms = () => {
    const groupElement = document.getElementById('group-terms');
    if (!termsCheckbox.checked) {
      setInvalid(termsCheckbox, groupElement);
      return false;
    }
    setValid(termsCheckbox, groupElement);
    return true;
  };

  // ==========================================================================
  // INLINE VALIDATION & DYNAMIC UI LISTENERS
  // ==========================================================================
  
  // Real-time text validation on input and blur
  fullNameInput.addEventListener('input', validateFullName);
  fullNameInput.addEventListener('blur', validateFullName);
  
  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  phoneInput.addEventListener('input', (e) => {
    // Restrict input characters to digits only
    e.target.value = e.target.value.replace(/\D/g, '');
    validatePhone();
  });
  phoneInput.addEventListener('blur', validatePhone);

  cityInput.addEventListener('input', validateCity);
  cityInput.addEventListener('blur', validateCity);

  positionSelect.addEventListener('change', validatePosition);
  positionSelect.addEventListener('blur', validatePosition);

  // Experience level custom selected container visual update & validation
  experienceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      // Remove custom background class from all radio label cards in group
      document.querySelectorAll('.radio-label').forEach(label => {
        label.classList.remove('selected-radio');
      });
      // Add custom class to the checked radio's parent label
      if (radio.checked) {
        radio.closest('.radio-label').classList.add('selected-radio');
      }
      validateExperience();
    });
  });

  // Skills checkbox validation on state change
  skillCheckboxes.forEach(cb => {
    cb.addEventListener('change', validateSkills);
  });

  portfolioInput.addEventListener('input', validatePortfolio);
  portfolioInput.addEventListener('blur', validatePortfolio);

  // Message character counter & validation
  messageTextarea.addEventListener('input', (e) => {
    const length = e.target.value.length;
    charCounter.textContent = `${length} / 300`;
    
    // Highlight characters in red if over 300
    if (length > 300) {
      charCounter.style.color = 'var(--error)';
    } else {
      charCounter.style.color = 'var(--text-muted)';
    }
    
    validateMessage();
  });
  messageTextarea.addEventListener('blur', validateMessage);

  termsCheckbox.addEventListener('change', validateTerms);

  // ==========================================================================
  // BUTTON RIPPLE EFFECT
  // ==========================================================================
  const createRipple = (e) => {
    const btn = e.currentTarget;
    
    // Create the ripple span element
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    
    // Set position and size relative to parent button
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripples to prevent accumulation
    const ripple = btn.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    
    btn.appendChild(circle);
  };

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // ==========================================================================
  // FORM RESET & SUBMISSION
  // ==========================================================================
  
  /**
   * Reset form and clear validation classes/counters
   */
  form.addEventListener('reset', () => {
    // Clear all validation visual feedback
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      clearValidationState(null, group);
    });

    // Reset radio background state classes
    document.querySelectorAll('.radio-label').forEach(label => {
      label.classList.remove('selected-radio');
    });

    // Reset character counter text
    charCounter.textContent = '0 / 300';
    charCounter.style.color = 'var(--text-muted)';
  });

  /**
   * Validate entire form on submit
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check validation of each individual component
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isCityValid = validateCity();
    const isPositionValid = validatePosition();
    const isExperienceValid = validateExperience();
    const isSkillsValid = validateSkills();
    const isPortfolioValid = validatePortfolio();
    const isMessageValid = validateMessage();
    const isTermsValid = validateTerms();
    
    const isFormValid = isFullNameValid && 
                        isEmailValid && 
                        isPhoneValid && 
                        isCityValid && 
                        isPositionValid && 
                        isExperienceValid && 
                        isSkillsValid && 
                        isPortfolioValid && 
                        isMessageValid && 
                        isTermsValid;
    
    if (isFormValid) {
      // Trigger success popup modal
      successModal.classList.add('show');
      successModal.setAttribute('aria-hidden', 'false');
      
      // Auto reset the form
      form.reset();
    } else {
      // For any field that fails, trigger CSS shake animation for accessibility focus
      if (!isFullNameValid) triggerShake(document.getElementById('group-fullName'));
      if (!isEmailValid) triggerShake(document.getElementById('group-email'));
      if (!isPhoneValid) triggerShake(document.getElementById('group-phone'));
      if (!isCityValid) triggerShake(document.getElementById('group-city'));
      if (!isPositionValid) triggerShake(document.getElementById('group-position'));
      if (!isExperienceValid) triggerShake(document.getElementById('group-experience'));
      if (!isSkillsValid) triggerShake(document.getElementById('group-skills'));
      if (!isPortfolioValid) triggerShake(document.getElementById('group-portfolio'));
      if (!isMessageValid) triggerShake(document.getElementById('group-message'));
      if (!isTermsValid) triggerShake(document.getElementById('group-terms'));

      // Auto-focus the first invalid input element
      const firstInvalidGroup = document.querySelector('.form-group.is-invalid');
      if (firstInvalidGroup) {
        const input = firstInvalidGroup.querySelector('input, select, textarea');
        if (input) {
          input.focus();
        }
      }
    }
  });

  // Close modal popup functionality
  const closeModal = () => {
    successModal.classList.remove('show');
    successModal.setAttribute('aria-hidden', 'true');
  };

  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal on escape keypress
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Close modal by clicking outside the modal content card
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeModal();
    }
  });
});
