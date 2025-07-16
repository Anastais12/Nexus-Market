// Show or hide custom description box based on select value
function toggleCustomRequest(selectElement, customBoxId) {
    const customBox = document.getElementById(customBoxId);
    if (selectElement.value.toLowerCase() === 'custom') {
      customBox.classList.remove('hidden');
    } else {
      customBox.classList.add('hidden');
      // Clear textarea if hidden
      const textarea = customBox.querySelector('textarea');
      if(textarea) textarea.value = '';
    }
  }
  
  // Modal controls
  function openModal() {
    document.getElementById('orderModal').classList.add('active');
  }
  
  function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
  }
  
  // Reload page on modal OK
  function reloadPage() {
    location.reload();
  }