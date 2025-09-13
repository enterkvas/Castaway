"use strict"
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
//------------------------------------------------
  // Function for submitting the entire form:
  async function formSend(e){
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if(error === 0){
      form.classList.add('_sending');	  

      let response = await fetch('./sendmail.php', {
        method: 'POST', 
        body: formData
      });
      if(response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Error');
        form.classList.remove('_sending');
        form.reset();
        function removeFocus() {
          document.getElementById("email").blur();
        }
        removeFocus()
      }
    } else {
      alert('Fill in required fields!');
    }
  }  
  //-----------------------------------------------
  // Function for validation:  
  function formValidate(form){
    let error = 0;

    const inputEmail = document.querySelector('._email');
    const errorLabel = document.createElement('label');

    // Checking that required fields are complete:
    let formReq = document.querySelectorAll('._req');

    for(let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if(input.value.trim() === '') {
        formAddError(input, 'Fill in required fields!');
        error++;

      } else if (input.classList.contains('_email')){        
        if(emailTest(input)){         
          error++;
        }           
      }                     
    }

    // Email test function:
    function emailTest(input){
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // Checking the Email field:
    if(inputEmail.value !== ''){
      formRemoveError(inputEmail);
      if(emailTest(inputEmail)){
        formAddError(inputEmail);
        error++;
      } else {
        formRemoveError(inputEmail);
      }
    }

    return error;
  }  
  //-------------------------------------------------
  function formAddError(input, text){
    const formItems = input.parentNode;
    input.classList.add('_error');
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('form-subscribe__label');
    errorLabel.textContent = text;        
    formItems.append(errorLabel);
  }

  function formRemoveError(input){
    const formItems = input.parentNode;
    if(input.classList.contains('_error')){
      formItems.querySelector('.form-subscribe__label').remove();
      input.classList.remove('_error');
    }    
  }
  
});