require('dotenv').config();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = form.username.value.trim();
      const product = form.product.value;
      const customRequest = form.custom_request ? form.custom_request.value.trim() : '';
      const quantity = form.quantity ? form.quantity.value : '1';
  
      const status = document.getElementById('status');
      status.textContent = 'Sending order...';
  
      // Validation
      if (!username || !product) {
        status.textContent = 'Please fill all required fields.';
        return;
      }
  
      const webhookURL = import.meta.env.WEBHOOK_SECRET_URL;
  
      // Compose description
      let description = `**User:** ${username}\n**Product:** ${product}\n**Quantity:** ${quantity}`;
      if(customRequest) description += `\n**Custom Request:** ${customRequest}`;
  
      const message = {
        embeds: [{
          title: "📦 **Order Received**",
          description,
          color: 0x00ffcc,
          footer: { text: "Nexus Market" }
        }]
      };
  
      try {
        const response = await fetch(webhookURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message)
        });
  
        if (response.ok) {
          form.reset();
          openModal();
          status.textContent = '';
        } else {
          status.textContent = '❌ Failed to send order. Please try again later.';
          console.error('Response status:', response.status);
        }
      } catch (err) {
        status.textContent = '❌ Error sending order. Please check your connection.';
        console.error('Fetch error:', err);
      }
    });
  });
